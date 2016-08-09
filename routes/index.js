'use strict'
var express = require('express');
var router = express.Router();
var models = require('../models');

//definition of the database modules
var Page = models.Page;
var User = models.User;

router.get('/', retrieveAllWiki);
router.get('/add', showAddForm);
router.post('/', submitNewWiki);
router.get('/:urlTitle', retrieveWikiByUrl);

function retrieveAllWiki(req, res, next) {
  Page.findAll({})
    .then(function(entries){
      res.render('index', {entries: entries});
      // res.json(entries);
    });
}

function showAddForm(req, res, next) {
  res.render('addpage', {
    title: 'Send a new Wiki'
  });
}

function submitNewWiki(req, res, next) {

  //{"author":"Adam","email":"adam@firstchild.com","title":"1","content":"Don't eat the apple!","status":"open"}

  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    email: req.body.email,
    status: req.body.status
  });

  page
    .save()
    .then(function(data) {
      res.redirect(data.route);
    });

}

function retrieveWikiByUrl(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
    .then(function(foundPage) {
      console.log(foundPage);
      res.render('wikipage', {
        title: foundPage.title,
        content: foundPage.content
      });
    })
    .catch(next);
}


//restful routing
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.put('/users/:userId', updateUserById);
router.delete('/users/:userId', deleteUserById);

function getAllUsers(req, res, next) {

}

function getUserById(req, res, next) {

}

function createUser(req, res, next) {

}

function updateUserById(req, res, next) {

}

function deleteUserById(req, res, next) {

}



module.exports = router;
