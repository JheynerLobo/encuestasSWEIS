const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

// Importing routes
const loginRoutes = require('./routes/login');
const encuestasRoutes = require('./routes/encuesta');
const poblacionRoutes = require('./routes/poblacion');
const inicioRoutes = require('./routes/inicio');
const { urlencoded } = require('express');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'sweis'
}, 'single'))
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', loginRoutes);
app.use('/encuestas', encuestasRoutes);
app.use('/poblacion', poblacionRoutes);
app.use('/inicio', inicioRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
