const tickets = require("./tickets");
const payments = require("./payments");

function api(routers) {
  routers.public.post("/tickets", tickets.post);
  routers.public.get("/tickets/:ticketNumber", tickets.get);
  routers.public.post("/payments/:ticketNumber", payments.post);
}

module.exports = api;
