const express = require('express');
const route = require('.');
const router = express.Router();
const meController = require('../app/controller/MeController');

router.use('/stored/courses', meController.show);

module.exports = router;
