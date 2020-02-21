const appRoot = require("app-root-path");
const express = require("express");
const dotenv = require("dotenv");

const routes = require("./routes");

const envReturn = dotenv.config({ path: "server/config/config.env" });
if (envReturn.error) {
  console.log("Something wrong with .env? ", envReturn.error);
}
const app = express();

app.use(express.static(`${appRoot}/public`));
app.use(express.static(`${appRoot}/public/dist`));

routes(app);

const PORT = process.env.PORT;
app.listen(PORT);

if (process.env.NODE_ENV === "development") {
  console.log(`Server running on: localhost:${PORT}`);
} else {
  console.log('prod')
}

module.exports = app;
