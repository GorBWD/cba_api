const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./api/routes');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'api/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// css and js files path
app.use(express.static('public'));

// Routes
app.use('/', routes.api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    console.log(err)
    err.status = 404;
    next(err);
});
// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message
    });
});

app.listen(config.PORT, () => {
    console.info(`Server listening on PORT ${ config.PORT }`);
});