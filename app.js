var express = require('express');
var session = require('express-session');
var flash      = require('connect-flash');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport   = require('passport');
var configDB = require('./config/database.js');

var app = express();

mongoose.connect(configDB.url);

app.use(express.static(__dirname + '/public'))

app.use(session({
  //store: new SessionStore({path: __dirname+'/tmp/sessions'}),
  secret: 'Habia una vez una galleta de melon que sabia a sandia',
  resave: true,
  saveUninitialized: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
//app.set('view engine', 'ejs'); // set up ejs for templating
app.set('view engine', 'ejs');
// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session







var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected');
});


require('./routes/principal.js')(app,passport);
require('./config/passport')(passport);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
