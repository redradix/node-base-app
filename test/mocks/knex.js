'use strict';
//var Promise = require('bluebird');

var mock = {
  _data: {},
  _throw: false,
  _error: null,
  _table: 'default',
  _chain: function(){
    return this;
  },
  _activeTable: function(table){
    this._table = table || 'default';
  },
  setup: function(data, table){
    table || (table = this._table);
    //console.log('Mock knex setup with', table, data);
    this._data[table] = data;
  },
  addRows: function(rows, table){
    table || (table = 'default');
    this._data[table].concat(rows);
  },
  shouldThrow: function(bool, err){
    this._throw = bool;
    if(bool){
      this._error = err || new Error('knex error');
    }
  },
  clean: function(){
    this._data = {};
    this._throw = false;
    this._error = null;
  },
  then: function(onFullfill, onReject){
    if(!this._throw){
      var data = this._data[this._table] || [];
      //console.log('Fulfilling ' + this._table, data);
      onFullfill(data);
    }
    else if(typeof(onReject) === 'function'){
      onReject(this._error);
    }
    return this;
  },
  catch: function(cb){
    if(this._throw){
      return cb(this._error);
    }
  },
  toSQL: function(){
    return 'mockSQL';
  }
};

mock.join =  mock._chain;
mock.rightJoin =  mock._chain;
mock.leftJoin =  mock._chain;
mock.whereIn = mock._chain;
mock.where = mock._chain;
mock.as = mock._chain;
mock.select = mock._chain;
mock.insert = mock._chain;
mock.update = mock._chain;
mock.del = mock._chain;
mock.orderBy = mock._chain;
mock.from = mock._chain;
mock.transacting = mock._chain;
mock.transaction = mock._chain;

function knexFactory(config){
  function knex(tableName){
    //console.log('Activating ', tableName);
    mock._activeTable(tableName);
    return mock;
  }

  knex.transaction = function(t){
    return mock;
  };

  knex.clean = function(){
    mock.clean();
  }

  return knex;
}

module.exports = knexFactory;
