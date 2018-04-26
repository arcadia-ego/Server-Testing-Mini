const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Dog = require("./Dog");
const server = express();
const mongoose = require("mongoose");
server.use(express.json());
server.use(morgan("dev"));

server.get("/api/dogs", (req, res) => {
  Dog.find({}, (err, dogs) => {
    if (err) {
      res.status(500).json({ error: "cant find doggies" });
    }
    console.log(dogs);
    res.json(dogs);
  });
});

server.post("/api/dogPost", (req, res) => {
  let dog = new Dog({
    name: "Joe",
    breed: "King Charles Cavalier"
  });
  dog.save((err, post) => {
    if (err) console.log(err);
    res.status(201).json(dog);
  });
});

server.put("/api/dogs/:id", (req, res) => {
  const { id } = req.params;
  // const dogPost = {name: req.body.name, breed: req.body.breed};
  let updatedDog = req.body;
  Dog.findByIdAndUpdate(id, updatedDog, { new: true }, (err, dog) => {
    if (err) return res.status(500).send(err);
    return res.status(202).send(dog);
  });
  console.log(req.body);
  // const newDogs = Dog.find({});
  // res.status(202).json(dogs)
});

module.exports = server;
