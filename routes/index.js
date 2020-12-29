var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth');
var conf = require('../config');
var answerController = require('../controllers/answerController');



var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === conf.admin.username  && user.pass === conf.admin.password) {
    return next();
  } else {
    return unauthorized(res);
  };
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('pages/about', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('pages/contact', { title: 'Express' });
});

router.get('/consent', function(req, res, next) {
  res.render('pages/consent', { title: 'Express' });
});

router.get('/instruction', function(req, res, next) {
  res.render('pages/instruction', { title: 'Express' });
});

router.get('/options', function(req, res, next) {
  res.render('pages/options', { title: 'Express' });
});

router.get('/research', auth, function(req, res, next) {
  res.render('pages/research', { title: 'Express' });
});

router.get('/list', auth, function(req, res, next) {
  answerController.getList(function(e){
    res.render('pages/list', { e: e });
  });  
});

router.post('/submit', auth, function(req, res, next) {
  //console.log(req.body)
  answerController.createAnswer(req.body, function(e){
    res.render('pages/result', { e: e });
  });  
});

module.exports = router;
