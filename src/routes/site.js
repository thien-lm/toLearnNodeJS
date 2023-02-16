const express = require('express');
const route = require('.');
const router = express.Router();

const siteController = require('../app/controller/SiteController');
//test for passportLocal
const passport = require('passport')
// const initPassportLocal = require("../app/controller/passport/passportLocal");

// initPassportLocal();

router.post('/login', passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/login"
    }));
router.use('/search', siteController.search);
router.post('/store', siteController.store);
router.use('/videoOfServer', siteController.showHTML)
router.use('/videoplayer', siteController.playVideo)

//router.post('/verify', siteController.checkLogin);//post and use are the same??????????????????
//test post va get voi cung /login

router.use('/login', siteController.login);
router.use('/ide', siteController.showIDE)
router.use('/user', siteController.user)
router.use('/signout', siteController.signout)
router.use('/signup', siteController.signup);
router.use('/', siteController.index);

module.exports = router;
