var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  userController.findUsers(function(e){
     res.send(e);
  });
});

router.get('/id/:id', function(req, res, next) {
  userController.findUserById(req.params.id, function(e){
     res.send(e);
  });  
});

router.get('/name/:name', function(req, res, next) {
  userController.findUserByName(req.params.name, function(e){
     res.send(e);
  });  
});

module.exports = router;
