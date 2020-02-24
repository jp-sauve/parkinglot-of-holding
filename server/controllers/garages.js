const Garage = require("../models/Garage").garageModel;

/**
 * @description Set up garage record in the database based on .env entries and sensible defaults
 */
exports.setup = async function() {
  Garage.find({ name: process.env.GARAGE_NAME }, function(err, garages) {
    if (err) {
      console.error(
        "I got an error while looking for your garage information! ",
        err
      );
    } else if (garages.length == 0) {
      console.log("No garages found. Lets create one!");
      Garage.create({
        name: process.env.GARAGE_NAME,
        totalParkingSpots: process.env.LOT_CAPACITY,
        availableSpots: process.env.LOT_CAPACITY,
        lastTicketNumber: 0
      });
    } else {
      console.log("Garage validated! ");
    }
  });
};
