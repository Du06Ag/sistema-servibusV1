const express = require ('express'),
      app     = express(),
      port    = process.env.PORT || 3000,
      passport     = require('passport'),
      multer  = require('multer'),
      flash   = require('connect-flash'),
      cookieParser = require('cookie-parser'),
      path    = require('path'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      session  = require('express-session');

//config DATABASE
const configDB = require('./config/database.js');

//Settings
app.use(cookieParser());

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(methodOverride("_method"));

//static files
app.use(express.static(path.join(__dirname, 'app/assets')));
app.use('/uploads', express.static('app/uploads'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// requieridos por passport
app.use(session({ secret: 'ppcdsalvc' })); // session secret
app.use(passport.initialize()); // persistent login sessions
app.use(passport.session());
app.use(function(req,res,next){
    if(req.user){
    	res.locals.user_nombre = req.user.nombre;
    	res.locals.user_id = req.user.id_usuario;
    	//console.log("->"+req.user.id_usuario)

	    if(req.user.id_rol == 1){
	        res.locals.user_rol = "Gerente";
	    }else if(req.user.id_rol == 2){
	        res.locals.user_rol = "Contador";
	    }else if(req.user.id_rol == 3){
	        res.locals.user_rol = "Secretaria";
	    }else if(req.user.id_rol == 4){
          res.locals.user_rol = "Recepcionista";
      }
    }
    next();
});
app.use(flash());  //use connect-flash for flash messages stored in session
require('./config/passport')(passport);


//routes
require('./app/routes.js')(app, passport, express);
app.listen(port, () => {
  console.log('Server is running on port : ' + port);
});
