//the app is running on the port
console.log("app.js file");
//db.js represents the total db schema
require('./db.js');
var express        =  require('express');
var path           =  require('path');
var favicon        =  require('serve-favicon');
var logger         =  require('morgan');
var cookieParser   =  require('cookie-parser');
var bodyParser     =  require('body-parser');
var multer         =  require('multer');
var app            =  express();
var path           =  require('path');
var controller     =  require('./routes/controller.js')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//meant for form data multipart
app.use(multer().array());
//--->multer .single is depreciated for getting the details form the collection from postman
//app.use(multer().single());
app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(cookieParser());
//the below file path look up the dependencies files
app.use(express.static(path.join(__dirname, 'public')));
//user credentials api
app.get('/api/todos'   ,                      controller.display);//with find method in index.js controoler
app.post('/userDetails/display/:id',          controller.userDetails);
app.post('/api/todos'    ,                    controller.create);
app.post('/api/login'   ,                     controller.login);
app.post('/api/delete'  ,                     controller.delete);
app.post('/api/edit',                         controller.edit);
//group credentials api
app.post('/api/group/create',                  controller.createGroup);
app.post('/api/group/participants',            controller.createParticipants);
app.post('/api/group/display', 		             controller.display_groups);
app.post('/api/group/show/participants/:id',   controller.group_participants);
app.post('/api/group/populate',                controller.populate);
//used to find how many users are active now
app.post('/api/active_users',           controller.active_users);
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './', 'views', 'index.html'));
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message  = err.message;
  res.locals.error    = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
