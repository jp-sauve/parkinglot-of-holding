const appRoot = require("app-root-path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const routes = require("./routes");
const apiSentry = require("./apiSentry");

const g = require("./controllers/garages");

// Get environment vars and print errors
const envReturn = dotenv.config({ path: "server/config/config.env" });
if (envReturn.error) {
  console.log("Something wrong with .env? ", envReturn.error);
}
// Initialize database connection
connectDB();
const app = express();
app.use(express.static(`${appRoot}/public`));
app.use(express.static(`${appRoot}/public/dist`));
app.use(bodyParser.json({ extended: true }));

routes(app, apiSentry);

const PORT = process.env.PORT;
const server = app.listen(PORT, function() {
  // Check database for garage matching environment vars or create a new one now
  console.log("Validating garage details...");
  g.setup(app);
});

if (process.env.NODE_ENV === "development") {
  console.log(`Server running on: localhost:${PORT}`);
} else {
  console.log("prod");
}

// Unhandled rejections are a cause for server failure. They must be fixed.
// process.on("unhandledRejection", (reason, promise) => {
//   console.log("\nOh no boss!", reason.message);
//   console.log(promise);
//   server.close(() => process.exit(1));
// });

module.exports = app;
