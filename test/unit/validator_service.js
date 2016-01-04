var should = require('should');
var uuid = require('uuid');

describe.only('Validator service', () => {
  var schemas = require('../../core/schemas');
  var subject = require('../../services/validation_service')(schemas);

  it('Should be an Object with validate function', () => {
    subject.should.be.an.Object;
    subject.validate.should.be.a.Function;
  });

  it('Should throw when validating a non existing Schema', () => {
    var obj = {
      foo: 'bar'
    }
    try {
      var results = subject.validate('WrongSchema', obj);
    }
    catch(err){
      err.should.be.an.Error;
      err.message.should.match(/schema not found/);
    }

  });

  it('Should accept a valid User', () => {
    var user = {
      username: 'foo',
      password: 'foobar'
    }

    var results = subject.validate('User', user);
    results.should.be.an.Object;
    results.valid.should.be.true;
    results.errors.should.have.length(0);
  });

  it('Should reject an invalid User', () => {
    var user = {
      name: 'foo',
      password: 25
    }

    var results = subject.validate('User', user);
    results.should.be.an.Object;
    results.valid.should.be.false;
    results.errors.should.have.length(2);
    results.errors[0].should.have.property('property', 'username');
    results.errors[0].should.have.property('attribute', 'required');

  });

  it('Should accept a valid Ingredient', () => {
    var ing = {
      name: 'Salt',
      cost: 10.50,
      stock: 1000
    };

    var results = subject.validate('Ingredient', ing);
    results.should.be.an.Object;
    results.valid.should.be.true;
    results.errors.should.have.length(0);
  });

  it('Should reject an invalid Ingredient', () => {
    var ing = {
      name: 'Salt',
      cost: '24',
      stock: 10.56
    };

    var results = subject.validate('Ingredient', ing);
    results.should.be.an.Object;
    results.valid.should.be.false;
    var errors = results.errors;

    errors.should.have.length(2);
    //cost wrong type, should be a number
    errors[0].should.have.property('property', 'cost');
    errors[0].should.have.property('attribute', 'type');
    errors[0].should.have.property('expected', 'number');
    //stock wrong type, should be an integer not a float (number)
    errors[1].should.have.property('property', 'stock');
    errors[1].should.have.property('attribute', 'type');
    errors[1].should.have.property('expected', 'integer');

  });

  it('Should accept a valid Dish', () => {
    var dish = {
      name: 'Mac Cheese',
      price: 14.90,
      ingredients: [
        {
          id: 'pasta',
          amount: 150
        },
        {
          id: 'tomato',
          amount: 30
        },
        {
          id: 'cheese',
          amount: 15
        }
      ]
    };

    var results = subject.validate('Dish', dish);
    results.should.be.an.Object;
    results.valid.should.be.true;
  });

  it('Should reject an invalid Dish (invalid ingredient)', () => {
    var wrongDish = {
      name: 'Mac Cheese',
      price: 14.90,
      ingredients: [
        {
          id: 'pasta',
          amount: 'foo'
        },
        {
          id: 'tomato'
        },
        {
          id: 350,
          amount: 15
        }
      ]
    };
    var results = subject.validate('Dish', wrongDish);
    results.should.be.an.Object;
    results.valid.should.be.false;
    results.errors.should.have.length(3);
  });

  it('Should accept a valid Order', () => {
    var order = {
      createdAt: Date.now(),
      createdBy: uuid.v4(),
      dishes: [
        {
          id: uuid.v4(),
          name: 'mac&cheese',
          amount: 2
        },
        {
          id: uuid.v4(),
          name: 'dessert',
          amount: 3
        }
      ]
    };

    var results = subject.validate('Order', order);
    console.log(results);
    results.valid.should.be.false;
    results.errors.should.have.length(0);
  });

  it('Should reject an invalid Order', () => {
    var wrongOrder = {
      createdAt: new Date(),
      createdBy: 1,
      dishes: []
    }
    var results = subject.validate('Order', wrongOrder);
    results.valid.should.be.false;
    results.errors.should.have.length(3);
  });
});