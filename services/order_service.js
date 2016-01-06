var uuid = require('uuid');
var _ = require('lodash');

/**
 * OrderService - handles Order CRUD
 *
 * Order has a one-to-many relation with Dish
 */
function OrderServiceFactory(db, validator){

  /* Returns all Orders */
  function getAll(){
    return db('order')
      .select('order.id', 'order.createdAt', 'user.username', 'user.id as userId')
      .join('user', 'order.createdBy', 'user.id')
      .orderBy('createdAt', 'desc')
      .then(orders => orders.map(o => {
        return {
          id: o.id,
          createdAt: o.createdAt,
          createdBy: {
            id: o.userId,
            username: o.username
          }
        }
      }))
  }

  /* Returns a single Order identified by its id */
  function getById(id){
    var res;
    return db('order').where({ id }).first()
      .then(order => {
        if(!order) { return null; }
        res = order;
        return db('order_dish')
          .join('dish', 'dishId', 'id')
          .select('id', 'name', 'price', 'amount')
          .where('orderId', id);
      })
      .then(dishes => {
        if(res)
          res.dishes = dishes || [];
        return res;
      });
  }

  /* Inserts a new Order and its related dishes */
  function create(order){
    var newOrder = Object.assign({}, { id: uuid.v4() }, order);
    return _validateOrder(newOrder)
      .then(newOrder => {
        newOrder.createdAt = new Date(newOrder.createdAt);
        return db('order').insert(_.omit(newOrder, 'dishes'))
      })
      .then(order => _saveOrderDishes(newOrder.id, newOrder.dishes))
      .then(() => newOrder);
  }

  /* Updates an Order, replacing all its related dishes */
  function update(id, order){
    return _validateOrder(order)
      .then(order => db('order').where({ id }).update(_.omit(order, ['dishes', 'createdAt'])))
      .then((affectedRows) => _clearOrderDishes(id))
      .then((affectedRows) => _saveOrderDishes(id, order.dishes))
      .then(() => order);
  }

  /* Deletes an Order and its related dishes */
  function deleteById(id){
    return _clearOrderDishes(id)
      .then(() => db('order').where({ id }).delete());
  }

  /* Inserts an Order's related dishes  */
  function _saveOrderDishes(orderId, dishes){
    return db('order_dish')
      .insert(dishes.map(d => {
        return {
          orderId: orderId,
          dishId: d.id,
          amount: d.amount
        }
      }));
  }

  /* Deletes an Order's related dishes  */
  function _clearOrderDishes(id){
    return db('order_dish').where('orderId', id).delete();
  }

  /* Validates an Order using JSON Schema */
  function _validateOrder(order){
    return validator.validateAsync('Order', order);
  }

  return {
    getAll,
    getById,
    create,
    update,
    deleteById
  }
}

module.exports = OrderServiceFactory;