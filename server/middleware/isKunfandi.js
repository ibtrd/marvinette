module.exports = function isKunfandi(req, res, next) {
  if (req.params.secret == process.env.KUNFANDI_SECRET) {
    next();
  } else {
    res.status(403).send();
  }
};
