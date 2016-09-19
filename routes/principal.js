module.exports = function (app, passport) {
    var company;
    var money;
    var phone;
    app.get('/login', function(req, res) {
      res.render('pages/login' ,{ message: req.flash('error') });
    });

    app.post('/login', passport.authenticate('local-login', { failureRedirect: '/login' , failureFlash: true }), function(req, res) {
      if ( req.user.role === 'admin' ) res.redirect('/');
    });

    app.get('/', login_required, function(req,res) {
      req.user.company = "";
      req.user.money ="";
      req.user.phone = "";
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
    app.post('/company', login_required, function(req,res) {

      req.session.company = req.body.company;
      req.session.save();
      res.render('pages/cantidad');

      app.post('/cantidad', login_required, function(req,res) {
        req.session.money = req.body.money;
        req.session.save();
        res.render('pages/phone');
        app.post('/phone', login_required, function(req,res) {
          req.session.phone = req.body.phone;
          req.session.save();
          res.render('pages/message', {company:req.session.company, money:req.session.money, phone:req.session.phone})
        });
      });
    });
    app.get('/*', login_required, function(req, res){
      res.redirect('/');
    });
}

var login_required = function (req, res, next) {
  if (req.user)
    return next();
  res.redirect('/login');
}
