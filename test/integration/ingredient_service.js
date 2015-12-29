var should = require('should');

describe('Ingredient Service', () => {
  var dbHelper = require('../helpers/db');
  var factory = require('../../services/ingredient_service'),
      subject = factory(dbHelper.knex);


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
      ingredient.should.deepEqual(fakeCheese);
      done();
    })
    .catch(err => {
      console.log('FAIL!');
      should.fail();
    })
  });

  it('Should return an ingredient by id', done => {
    subject.getById(fakeCheese.id).then(cheese => {
      cheese.should.deepEqual(fakeCheese);
      done();
    })
  });

  it('Should return all ingredients', done => {
    subject.getAll().then(ingredients => {
      //console.log('Stuff', ingredients);
      ingredients.should.be.an.Array;
      ingredients.should.have.length(1);
      done();
    });
  });

  it('Should allow updating an ingredient', done => {
    var updatedIngredient = Object.assign({}, fakeCheese, { cost: 10 });
    subject.update(updatedIngredient).then(i => {
      i.cost.should.equal(10);
      done();
    })
  });

  it('Should allow deleting an ingredient by id', done => {
    subject.deleteById(fakeCheese.id).then(() => {
      //now try to fetch it by id
      subject.getById(fakeCheese.id).then(ingredient => {
        should(ingredient, undefined);
        done();
      })
    })
  })


});