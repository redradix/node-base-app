var should = require('should');

describe.only('Ingredient Service', () => {
  var dbHelper = require('../helpers/db');
  var schemas = require('../../core/schemas'),
      validator = require('../../services/validation_service')(schemas);
  var factory = require('../../services/ingredient_service'),
      subject = factory(dbHelper.knex, validator);


  var fakeCheese = {
    name: 'Brie cheese',
    cost: 8.5,
    stock: 1000
  };

  var fakeHam = {
    name: 'Joselito Black Leg Ham',
    cost: 500,
    stock: 100
  };

  var fakeCheeseId;

  it('Should return an object', () => {
    subject.should.be.an.Object;
    subject.getAll.should.be.a.Function;
    subject.getById.should.be.a.Function;
    subject.create.should.be.a.Function;
    subject.update.should.be.a.Function;
    subject.deleteById.should.be.a.Function;
  });

  it('Should create a new ingredient', done => {
    subject.create(fakeCheese).then(ingredient => {
      fakeCheeseId = ingredient.id;
      ingredient.should.have.property('name', fakeCheese.name);
      done();
    })
    .catch(done)
  });

  it('Should avoid creating a non-valid ingredient', done => {
    var wrongIngredient = {
      name: 'foo',
      cost: 25.5,
      stock: null
    }

    subject.create(wrongIngredient)
    .catch(errors => {
      errors.should.be.an.Array;
      errors.should.have.length(1);
      done();
    });
  });

  it('Should return an ingredient by id', done => {
    subject.getById(fakeCheeseId).then(cheese => {
      cheese.should.deepEqual(Object.assign({ id: fakeCheeseId }, fakeCheese));
      done();
    })
    .catch(done)
  });

  it('Should return all ingredients', done => {
    subject.getAll().then(ingredients => {
      //console.log('Stuff', ingredients);
      ingredients.should.be.an.Array;
      ingredients.should.have.length(1);
      done();
    })
    .catch(done);
  });

  it('Should allow updating an ingredient', done => {
    var updatedIngredient = Object.assign({}, fakeCheese, { cost: 10 });
    subject.update(fakeCheeseId, updatedIngredient).then(i => {
      i.cost.should.equal(10);
      done();
    })
    .catch(done)
  });

  it('Should reject updating an invalid ingredient', done => {
    var updatedIngredient = Object.assign({}, fakeCheese, { name: null });
    subject.update(fakeCheeseId, updatedIngredient)
    .catch(errors => {
      errors.should.be.an.Array;
      errors.should.have.length(1);
      done();
    })
  })

  it('Should allow deleting an ingredient by id', done => {
    subject.deleteById(fakeCheeseId).then(() => {
      //now try to fetch it by id
      subject.getById(fakeCheeseId).then(ingredient => {
        should(ingredient, undefined);
        done();
      })
    })
    .catch(done)
  })


});