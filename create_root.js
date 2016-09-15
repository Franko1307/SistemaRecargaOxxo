var mongoose = require('mongoose');
var bCrypt   = require('bcrypt-nodejs');

//Chequeo si la contra está chida

//Crea una contra chida
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


mongoose.connect('mongodb://localhost/OTTZO');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('SIIIIIIIII');
});

var UserSchema = new require('mongoose').Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.plugin(require('mongoose-role'), {
  roles: ['public', 'user', ,'company', 'admin'],
  accessLevels: {
    'public': ['public', 'user', 'admin'],
    'user': ['user', 'admin'],
    'company' : ['user','admin'],
    'admin': ['admin']
  }
});



var root = mongoose.model('User', UserSchema);

root.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      user.remove(function(err,removed) {
        console.log('removido nigga');
      });
    });
    console.log('Ahora la base de datos está Vacía');
  });

var admin = new root();

admin.username = 'root';
admin.password = createHash('root123');
admin.role = 'admin'

//console.log(mongoose.models);

admin.save(function (err, admin) {
  if (err) {
    return console.error(err);
  }
  else {
    console.log('Registrado satisfactoriamente');
  }

});
