function post(req, res) {
  // I'm not going to validate the post data for time reasons
  // I'd likely be using Stripe
  console.log("Params: ", req.params);
  console.log("Request body: ", Object.keys(req.body));
  // check for the existence of 'ccNumber' 'ccExpiry' 'ccv'
  // 'amount' added by fetching ticket and calculating,
  // remove ticket from 'outstandingTickets' and increment availableSpots
  res.json({
    requestedNumber: req.params.ticketNumber,
    cost: 1.5 * req.params.ticketNumber
  });
}

module.exports = {
  post
};
