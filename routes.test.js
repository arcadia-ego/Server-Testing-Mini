const chai = require("chai");
const mongoose = require("mongoose");
const chaiHTTP = require("chai-http");
const server = require("./server");
chai.use(chaiHTTP);

mongoose.connect("mongodb://localhost/testTest", {}, err => {
  if (err) return console.log(err);
  console.log("Mongo Connection Success");
});

const Dog = require("./Dog");
const expect = chai.expect;
const assert = chai.assert;

describe("Dogs", () => {
  let dogId;
  beforeEach(done => {
    const newDog = new Dog({
      name: "Charles",
      breed: "Mastiff"
    });
    newDog
      .save((err,savedDog) => {
          if(err) {
              console.log(err);
              done();
          }
        dogId = savedDog._id.toString();
        done();
      })
  });

//   afterEach(done => {
//       Dog.remove({}, err => {
//           if (err) console.log(err);
//           return done();
//       });
//   });

  describe("GET to /api/dogs", () => {
    it.skip("should get a list of dog breeds", done => {
      chai
        .request(server)
        .get('/api/dogs')
        .end((err, response) => {
            if (err) {
                console.log(err);
                return done();
            }
            const {_id, name, breed} = response.body[0];
            expect(response.status).to.equal(200);
            assert.typeOf(response.body, 'array');
            expect(_id).to.equal(dogId);
            return done();
        })
    });
  });


describe('POST to /api/dogPost', () => {
    it.skip('should add a new dog to DB', done => {
        const dogs = Dog.find({})
        chai
            .request(server)
            .post('/api/dogPost')
            .end((err, response) => {
                if(err) {
                    console.log(err);
                    return done();
                }
                // console.log(response);
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal('Joe');
                expect(response.body.breed).to.equal('King Charles Cavalier');
                return done();
            })
    })
})

describe('PUT to /api/dogs/id', () => {
    it('should update a dog with a specific ID', done => {
        // const { id } = req.params._id
        // const dogPost = {name: req.body.name, breed: req.body.breed};
        chai
            .request(server)
            .put('/api/dogs/5ae244441bb61126fc6a5527')
            .send({name: 'putDog', breed:'breedofPutDog' })
            .end((err, response) => {
                if(err) {
                    console.log(err);
                    return done();
                }
                expect(response.status).to.equal(202);
                expect(response.body.name).to.equal('putDog');
                return done();
            })
    })
})


});
