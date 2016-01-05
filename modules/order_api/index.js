
function OrderAPIFactory(webapp, orderService, httpSecurity){

  function fetchOrder(req, res, next, orderId){
    orderService.getById(orderId)
      .then(order => {
        if(!order){
          return res.send(404).end();
        }
        req.order = Object.assign({}, order, { createdAt: order.createdAt.getTime() });
        next();
      })
      .catch(err => {
        return res.send(500).end();
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

  var app = webapp.app;

  app.get('/api/orders', httpSecurity.requireToken, getAll);
  app.post('/api/orders', httpSecurity.requireToken, create);
  app.get('/api/orders/:orderId', httpSecurity.requireToken, getById);
  app.put('/api/orders/:orderId', httpSecurity.requireToken, update);
  app.delete('/api/orders/:orderId', httpSecurity.requireToken, deleteById);
  app.param('orderId', fetchOrder);

  console.log('Order API attached');
  return {};

}

module.exports = OrderAPIFactory;