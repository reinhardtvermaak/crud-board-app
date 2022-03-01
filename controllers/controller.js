// const express = require('express');
// const route = express.Router();

const db = require("../models");
const Thing = db.thing;

// Create and save a new thing
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    const thing = new Thing({
        name: req.body.name,
        keywords: req.body.keywords
    });
    
    thing
        .save(thing)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the thing."
            });
        });
};

// Retrieve all things from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Thing.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Thing.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: `Thing with id=${id} not found.` });
            else res.send(data);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "Error retrieving thing with id=" + id });
        });
};
  
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Thing.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Could not update thing with id=${id}.`
                });
            } else res.send({ message: "Updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating thing with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Thing.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Could not delete thing with id=${id}.`
                });
            } else {
                res.send({
                    message: "Thing was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete thing with id=" + id
            });
        });
};
