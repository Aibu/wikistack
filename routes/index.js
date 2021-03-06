'use strict'
var express = require('express');
var router = express.Router();
var usersRouter = express.Router();
var models = require('../models');
var Promise = require('bluebird');

//definition of the database modules
var Page = models.Page;
var User = models.User;

//restful routing
usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.put('/:userId', updateUserById);
usersRouter.delete('/:userId', deleteUserById);

router.get('/', retrieveAllWiki);
router.get('/add', showAddForm);
router.post('/', submitNewWiki);
router.get('/:urlTitle', retrieveWikiByUrl);

function retrieveAllWiki(req, res, next) {
  Page.findAll({})
    .then(function(entries) {
      res.render('index', {
        entries: entries
      });
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
    status: req.body.status
  });

  User.findOrCreate({
    where: {
      name: req.body.author,
      email: req.body.email
    }
  })
    .then(function(userData) {
      var user = userData[0];

      return page
        .save()
        .then(function(data) {
          return page.setAuthor(user);
        });
    })
    .then(function(pageData) {
      res.redirect(pageData.route);
    });



}

function findOrCreateUser(name, emailAddress) {

}

function retrieveWikiByUrl(req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [{
      model: User,
      as: 'author'
    }]
  })
    .then(function(page) {
      // page instance will have a .author property
      // as a filled in user object ({ name, email })
      if (page === null) {
        res.status(404).send();
      } else {
        res.render('wikipage', {
          page: page
        });
      }
    })
    .catch(next);
}



function getAllUsers(req, res, next) {
  User.findAll()
    .then(function(authors) {
      res.render('authorIndex', {
        authors: authors
      });
    })
    .catch(function(error) {
      console.log(error);
    });

}

function getUserById(req, res, next) {
  var userPromise = User.findOne({
    where: {
      id: req.params.userId
    }
  })
  var pagePromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  var userPage = Promise.all([userPromise, pagePromise]);

  userPage
    .then(function(promises) {
      res.render('userpage', {
        user: promises[0],
        entries: promises[1]
      });
    })
    .catch(next);
}

function createUser(req, res, next) {

}

function updateUserById(req, res, next) {

}

function deleteUserById(req, res, next) {

}



module.exports = {
  router: router,
  usersRouter: usersRouter
};