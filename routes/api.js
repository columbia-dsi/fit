var express = require('express');
var router = express.Router();

/* GET api page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the restful API.  -CTO.');
});

module.exports = router;
