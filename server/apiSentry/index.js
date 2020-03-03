const reqTime = function(req, res, next) {
  req.reqTime = new Date().toLocaleString();
  next();
};

const configSanityCheck = function(req, res, next) {
  if (!req.app.locals.saneConfig) {
    console.log("Broken config. Can not continue.");
    return next("router");
  } else {
    next();
  }
};

module.exports = [reqTime, configSanityCheck];
