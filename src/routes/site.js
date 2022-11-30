const express = require('express');
const route = require('.');
const router = express.Router();

const siteController = require('../app/controller/SiteController');

router.use('/search', siteController.search);
router.post('/store', siteController.store);
router.post('/verify', siteController.checkLogin);//post and use are the same??????????????????
router.use('/login', siteController.login);
router.use('/signup', siteController.signup);
router.use('/', siteController.index);

module.exports = router;
