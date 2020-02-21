const appRoot = require("app-root-path");

function get(req, res) {
  res.sendFile(`${appRoot}/public/dist/index.html`);
}

module.exports = {
  get
};
