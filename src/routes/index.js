const newsRouter = require('./news');
const courseRouter = require('./course');
const siteRouter = require('./site');
const siteController = require('../app/controller/SiteController');
const meRouter = require('./me');

const passport = require('passport')
// const initPassportLocal = require("../app/controller/passport/passportLocal");

// initPassportLocal();

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login')
}

function route(app) {
    app.post('/store', siteController.store);
    app.post('/login', passport.authenticate("local", {
        successRedirect: "/user",
        failureRedirect: "/login"
        }));    
    app.use('/login', siteController.login);
    app.use('/signup',siteController.signup);
    app.use(ensureAuthenticated);


    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', courseRouter);
    app.use('/', siteRouter);
}

module.exports = route;
