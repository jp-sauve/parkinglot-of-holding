const Garage = require("../models/Garage").garageModel;

/**
 * @description Set up garage record in the database based on .env entries and sensible defaults
 */
exports.setup = async function(app) {
  Garage.find({ name: process.env.GARAGE_NAME }, function(err, garages) {
    app.locals.saneConfig = false;
    if (err) {
      console.error(
        "I got an error while looking for your garage information. Please forward the following text to a developer to get it sorted. ",
        err
      );
    } else if (garages.length == 0) {
      console.log("Trying to create a new parking lot...");
      if (process.env.GARAGE_NAME && process.env.LOT_CAPACITY) {
        Garage.create(
          {
            name: process.env.GARAGE_NAME,
            totalParkingSpots: process.env.LOT_CAPACITY,
            availableSpots: process.env.LOT_CAPACITY,
            lastTicketNumber: process.env.LAST_TICKET || 0
          },
          (err, garage) => {
            if (err) {
              console.error(
                "Failed to create garage. Check error for info: \n",
                err
              );
            } else {
              console.log(
                "Created new garage. Please verify details: \n",
                garage
              );
            }
          }
        );
        app.locals.saneConfig = true;
      } else {
        console.error(
          "config.env file is missing 'GARAGE_NAME' or 'LOT_CAPACITY' values"
        );
      }
    } else {
      console.log("Garage validated! ");
      app.locals.saneConfig = true;
    }
  });
};
