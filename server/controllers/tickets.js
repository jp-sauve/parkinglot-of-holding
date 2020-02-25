const Garage = require("../models/Garage").garageModel;
const chalk = require("chalk");
const verbose = true; // Would normally handle with yargs
const {
  minutesBetween,
  fullHours,
  rate,
  entranceIsBeforeExit
} = require("../utils/time");

/**
 *
 * @description Return the total currently owed on the ticket
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
async function get(req, res) {
  // Get ticket from database to check time. return 404 if it's not there
  const garage = await Garage.find({ name: process.env.GARAGE_NAME });

  if (garage.length > 0) {
    const now = new Date().getTime();
    const ourGarage = garage[0];
    const tickets = ourGarage.outstandingTickets.filter(
      ticket => ticket.ticketNumber == req.params.ticketNumber
    );

    // Only continue if there's a ticket that makes sense
    if (tickets.length && entranceIsBeforeExit(tickets[0].timestamp, now)) {
      const ticket = tickets.pop();
      const times = [ticket.timestamp, now];

      // Send ticket and calculated costs to front-end
      res.status(200).json({
        success: true,
        ticket,
        arrival: new Date(times[0]).toLocaleString(),
        departure: new Date(times[1]).toLocaleString(),
        minutes: minutesBetween(...times),
        wholeHours: fullHours(minutesBetween(...times)),
        rateLevel: rate(...times)
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }
  } else {
    res.status(500).json({
      success: false
    });
  }
}

/**
 * @description Get parking ticket if available
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
async function post(req, res) {
  const garage = await Garage.find({ name: process.env.GARAGE_NAME });
  if (garage.length > 0) {
    let ourGarage = garage[0];
    if (ourGarage.availableSpots > 0) {
      // Add ticket to checked-in array, set counters, and save
      const newTicket = {
        timestamp: new Date().getTime(),
        ticketNumber: ourGarage.lastTicketNumber + 1
      };
      if (verbose) {
        console.log(
          `${chalk.green.bold("Checking in:")} ${chalk.white.bold(
            newTicket.ticketNumber
          )}\n${chalk.white.dim("Spaces available: ")}${chalk.green.dim(
            ourGarage.availableSpots
          )}`
        );
      }
      ourGarage.outstandingTickets.push(newTicket);
      ourGarage.lastTicketNumber = ourGarage.lastTicketNumber + 1;
      ourGarage.availableSpots = ourGarage.availableSpots - 1;
      await ourGarage.save();
      res.status(201).json({ success: true, data: newTicket });
    } else {
      if (verbose) console.log(`${chalk.red.bold("Checkin rejected, lot full")}`);
      res.status(400).json({
        success: false,
        message: "Lot full. We're sorry for the inconvenience."
      });
    }
  } else {
    res.status(500).json({
      success: false,
      message: "No garage was found, so all is not well!"
    });
  }
}

module.exports = {
  get,
  post
};
