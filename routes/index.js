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

function retrieveAllWiki(req, res, next) {
  res.send('got to GET /wiki/');
}

function showAddForm(req, res, next) {
  res.render('addpage', {title: 'Send a new Wiki'})
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

    page.save(function(){
      res.redirect('/');
    });

}


//restful routing
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.put('/users/:userId', updateUserById);
router.delete('/users/:userId', deleteUserById);

function getAllUsers(req, res, next){

}

function getUserById(req, res, next){

}

function createUser(req, res, next){

}

function updateUserById(req, res, next){

}

function deleteUserById(req, res, next){

}

  // here we basically treet the root view and tweets view as identical
  // router.get('/', respondWithAllTweets);
  // router.get('/tweets', respondWithAllTweets);

  // single-user page


  // single-tweet page
  // router.get('/tweets/:id', function(req, res, next){

  //   client.query('SELECT * FROM tweets INNER JOIN users ON users.id = tweets.userid WHERE tweets.id = $1', [req.params.id], function ( err, result) {
  //     if (err) return next(err);
  //     var tweet = result.rows
  //     res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: tweet // an array of only one element ;-)
  //     })
  //   })

  // });

  // // create a new tweet
  // router.post('/tweets', function(req, res, next){
  //   // var newTweet = tweetBank.add(req.body.name, req.body.content);
  //   var userId = undefined;
  //   var userName = undefined;
  //   client.query('SELECT * FROM users WHERE users.name = $1', [req.body.name], function (err, result){
  //     if (err) return next(err);
  //       if(result.rows.length !== 0) {
  //         userId = result.rows[0].id;
  //         userName = result.rows[0].name;

  //       client.query('INSERT INTO tweets (userid,content) VALUES ($1,$2) RETURNING tweets.id', [userId,req.body.content], function(err, result) {
  //         console.log(userId);
  //         if (err) return next(err)

  //         var content = req.body.content
  //         var tweetId = result.rows[0].id
  //         var newTweet = { name: userName, content: content, id: tweetId }


  //         io.sockets.emit('new_tweet', newTweet);
  //         res.redirect('/');
  //       });


  //       } else {
  //         var picurl = 'http://images.onesite.com/capcom-unity.com/user/104037628/avatar.jpg?type=user&ts=0910-1410';
  //         client.query('INSERT INTO users (name, pictureurl) VALUES ($1, $2) RETURNING users.id', [req.body.name, picurl], function(err, result){
  //           if(err) return next(err);
  //           userId = result.rows[0].id;
  //           userName = result.rows[0].name;


  //       client.query('INSERT INTO tweets (userid,content) VALUES ($1,$2) RETURNING tweets.id', [userId,req.body.content], function(err, result) {
  //         console.log(userId);
  //         if (err) return next(err)

  //         var content = req.body.content
  //         var tweetId = result.rows[0].id
  //         var newTweet = { name: userName, content: content, id: tweetId }


  //         io.sockets.emit('new_tweet', newTweet);
  //         res.redirect('/');
  //       });


  //         })
  //       }



  //     });
  // });


module.exports = router;

