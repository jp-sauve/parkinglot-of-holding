const express = require("express");

const api = require("./api");
const pages = require("./pages");

function routes(app) {
  const routers = {
    public: express.Router()
  };

  api(routers);
  pages(routers);

  app.use("/", routers.public);
}

module.exports = routes;
