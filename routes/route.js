const express = require('express');

module.exports = app => {
    const controller = require("../controllers/controller.js");
    const router = express.Router();

    router.get("/", controller.findAll);
    router.post("/", controller.create);
    router.get("/find/:id", controller.findOne);
    router.post("/edit/:id", controller.update);
    router.delete("/delete/:id", controller.delete);

    app.use('/api/things', router);
};
