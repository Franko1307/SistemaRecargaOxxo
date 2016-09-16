module.exports = function (app, passport) {

    app.get('/login', function(req, res) {
      res.render('pages/login' ,{ message: req.flash('error') });
    });

    app.post('/login', passport.authenticate('local-login', { failureRedirect: '/login' , failureFlash: true }), function(req, res) {
      //console.log(req.user);
      if ( req.user.role === 'admin' ) res.redirect('/');
    });

    app.get('/', login_required, function(req,res) {
      res.render('pages/inicio');
    });

    app.get('/logout', login_required, function(req, res){
      req.logout();
      res.redirect('/');
    });

    app.get('/recarga', login_required, function(req, res){
      res.render('pages/recarga')
    });
    app.post('/recarga', login_required, function(req, res){
      res.render('pages/respuesta', {message: "La recarga de " + req.body.amount + " al número " + req.body.phone + " de la compañía " + req.body.fb + " se ha realizado correctamente"} )
    });
}

var login_required = function (req, res, next) {
  console.log(req.user);
  if (req.user)
    return next();
  res.redirect('/login');
}
