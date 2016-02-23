var _ = require('lodash');
/**
 * OrderController
 */
function OrderControllerFactory(webapp, orderService, httpSecurity){

  //Express param handler, loads Order into Request object
  function loadOrder(req, res, next, orderId){
    orderService.getById(orderId)
      .then(order => {
        if(!order){
          return res.status(404).end();
        }
        req.order = Object.assign({}, order, { createdAt: order.createdAt.getTime() });
        next();
      })
      .catch(err => {
        console.log('Error fetching order', err);
        return res.status(500).end();
      });
  }

  //Returns all Orders
  function getAll(req, res){
    orderService.getAll().then(orders => {
      res.send({
        type: 'orders',
        data: orders
      });
    })
  }

  // Returns a single Order
  function getById(req, res){
    res.send({
      type: 'orders',
      data: req.order
    });
  }

  // Creates a new Order
  function create(req, res){
    var postedOrder = req.body;
    //use JWT-provided user object
    postedOrder.createdBy = req.user.id;
    postedOrder.createdAt = Date.now();

    orderService.create(postedOrder)
      .then(order => {
        res.send({
          type: 'orders',
          data: order
        })
      })
      .catch(err => {
        console.log('Error creating Order', err)
        res.status(400).send({
          type: 'orders',
          errors: [].concat(err)
        })
      })
  }

  // Updates an Order
  function update(req, res){
    var updatedOrder = Object.assign({}, req.order, _.omit(req.body, ['id', 'createdBy', 'createdAt']));
    orderService.update(req.order.id, updatedOrder)
      .then(order => {
        res.send({
          type: 'orders',
          data: order
        })
      })
      .catch(err => {
        res.status(400).send({
          type: 'orders',
          errors: [].concat(err)
        })
      })
  }

  // Deletes an Order by id
  function deleteById(req, res){
    orderService.deleteById(req.order.id)
      .then(() => res.status(200).end())
      .catch(err => res.status(406).send({ errors: [].concat(err)}));
  }

  var router = webapp.apiRouter;
  router.all('/orders*', httpSecurity.requireToken);
  router.get('/orders', getAll);
  router.post('/orders', create);
  router.get('/orders/:orderId', getById);
  router.put('/orders/:orderId', update);
  router.delete('/orders/:orderId', deleteById);
  router.param('orderId', loadOrder);

  return {};

}

module.exports = OrderControllerFactory;