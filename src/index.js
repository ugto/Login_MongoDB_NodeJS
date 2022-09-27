const express= require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan'); 
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//requerimientos o initializations
const app = express();
require('./database');
require('./passport/local-auth');

//configuraciones
app.set('views', path.join(__dirname,'views'));
app.engine('ejs', engine);
app.set('view engine','ejs');
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'miclave',
    resave: false,
    saveUninitialized:false
    
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    app.locals.signupMensaje = req.flash('signupMensaje');
    app.locals.signinMensaje = req.flash('signinMensaje');
    app.locals.user= req.user;
    //console.log(app.locals);
    next();
});




//Rutas
app.use('/',require('./routes/index'));



//Iniciando Servidor
app.listen(app.get('port'),()=>{
    console.log('SERVIDOR EN PUERTO',app.get('port'))
});



