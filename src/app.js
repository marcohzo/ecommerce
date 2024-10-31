import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from '../src/config/passport.config.js';
import { passportCall } from './utils.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import userRouter from './routes/users.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const MONGODB = process.env.MONGODB_URI;

//configuracion de handlebars
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', _dirname + '/views');

// Middleware para parsear el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar cookies
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Conexion a MongoDB
mongoose.connect(MONGODB);
  

// Configurar sesion
app.use(session ({
    store: MongoStore.create({ mongoUrl: MONGODB, ttl: 600 }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

// Inicializar passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.get('/current', passportCall('jwt'), (req, res) => {
    res.render('current', {
        message: 'User authenticated',
        user: req.user
    });
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})