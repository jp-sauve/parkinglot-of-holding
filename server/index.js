const appRoot = require("app-root-path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const routes = require("./routes");

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
routes(app);

const PORT = process.env.PORT;
const server = app.listen(PORT);

if (process.env.NODE_ENV === "development") {
  console.log(`Server running on: localhost:${PORT}`);
} else {
  console.log("prod");
}

// Unhandled rejections are a cause for server failure. They must be fixed.
process.on("unhandledRejection", (reason, promise) => {
  console.log("\nOh no boss!", reason.message);
  console.log(promise);
  server.close(() => process.exit(1));
});

module.exports = app;
