require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionStore = new MySQLStore({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'fanconnect',
});
app.use(
    session({
        secret: 'fanconnectsecret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes');
app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
