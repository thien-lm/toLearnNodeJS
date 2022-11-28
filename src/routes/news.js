const express = require('express');
const route = require('.');
const router = express.Router();
const newsController = require('../app/controller/NewsController');

router.use('/linh', newsController.show);
router.use('/', newsController.index);

module.exports = router;
