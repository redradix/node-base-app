
function OrderControllerFactory(webapp, orderService, httpSecurity){

  function fetchOrder(req, res, next, orderId){
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

  function getAll(req, res){
    orderService.getAll().then(orders => {
      res.send({
        type: 'orders',
        data: orders
      });
    })
  }

  function getById(req, res){
    res.send({
      type: 'orders',
      data: req.order
    });
  }

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
        res.status(406).send({
          type: 'orders',
          success: false,
          errors: [].concat(err)
        })
      })
  }

  function update(req, res){
    var updatedOrder = Object.assign({}, req.order, req.body);
    console.log('Order update', updatedOrder);
    orderService.update(req.order.id, updatedOrder)
      .then(order => {
        res.send({
          type: 'orders',
          data: order
        })
      })
      .catch(err => {
        res.status(406).send({
          type: 'orders',
          success: false,
          errors: [].concat(err)
        })
      })
  }

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
  router.param('orderId', fetchOrder);

  return {};

}

module.exports = OrderControllerFactory;