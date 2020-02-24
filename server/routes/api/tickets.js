function get(req, res) {
  // calculate amount owing
  res.status(200).json({
    requestedNumber: req.params.ticketNumber,
    enter: "timestamp",
    depart: "timestamp",
    cost: "dollars"
  });
}

function post(req, res) {
  // Check if garage availableSpots < totalParkingSpots
  // If so, create new ticket using garage's lastTicketNumber + 1,
  // increment garage's lastTicketNumber and decrement availableSpots,
  // add ticket to outstandingTickets, return ticket
  res.status(200).json({
    id: 1
  });
}

module.exports = {
  get,
  post
};
