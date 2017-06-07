var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io = require( "socket.io" );

var app = express();

// Socket.io
var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//serve up everything in public as static assets
app.use(express.static(path.join(__dirname, 'public')));

// MAK, we want / to be the TV screen itself, so nuke this route
//app.use('/', index);
app.use('/tv', require('./routes/tv'));
app.use('/info', require('./routes/info'));
app.use( '/upnp', require( './routes/upnp' ) );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


io.on( 'connection', function ( socket ) {
    console.log( 'Socket connected...' );
    socket.join( 'channel-info' );
    io.to( 'channel-info' ).emit( 'join' );
} );


module.exports = app;
