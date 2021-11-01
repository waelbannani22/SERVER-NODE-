const express = require("express");
const userModel = require("./volunteer");
const categoryModel =require ("./category")
const app = express();



app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);

    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await userModel.find({});

    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  // add category
  app.post("/add_category", async (request, response) => {
    const category = new categoryModel(request.body);

    try {
      await category.save();
      response.send(category);
    } catch (error) {
      response.status(500).send(error);
    }
});


  module.exports = app;