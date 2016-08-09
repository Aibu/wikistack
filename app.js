'use strict'

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var models = require('./models');
var path = require('path');
var fs = require('fs');
var routes = require('./routes');


var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/wiki', routes.router);
app.use('/users', routes.usersRouter);

// app.get('/test', function(req, res, next){
// 	console.log('test');
// 	res.send('test');
// });

console.log(routes);

app.use(express.static(path.join(__dirname + '/public')));

// templating boilerplate setup
app.engine('html', swig.renderFile); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
app.set('views', path.join(__dirname, '/views')); // where to find the views
swig.setDefaults({ cache: false });



//connecting to database and start server on port 3001

models.User.sync({})
.then(function () {
   return models.Page.sync({force:false});
})
.then(function () {
   app.listen(3001, function () {
       console.log('Server is listening on port 3001!');
   });
})
.catch(console.error);
