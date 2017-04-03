(function() {
  'use strict';

  // dependencies
  var express = require('express'),
    path = require('path'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    portNumber = 3000,
    ejsRenderer = require('ejs').renderFile;

  // Configure parsing of body in request
  app.use(bodyParser.urlencoded({ extended : true }))
  app.use(bodyParser.json());

  // Setup logging
  app.use(morgan('dev'));

  // Configure the rendering engine
  app.engine('html', ejsRenderer); // Add html files
  app.set('views', __dirname + '/');

	// Configure static file serving
	app.use('/', express.static(path.resolve('./public')));
	app.use('/modules', express.static(path.resolve('./modules')));

  app.route('/*').get(renderMain);
  function renderMain(req, res) {
    res.render('server_views/index.html', {});
  }

  // set port
  app.listen(portNumber);
  console.log('Server running on http://localhost:', portNumber);

  module.exports = app;
}());
