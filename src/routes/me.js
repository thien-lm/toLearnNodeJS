const express = require('express');
const router = express.Router();
const meController = require('../app/controller/MeController');


router.get('/stored/courses', meController.storedCourses)


module.exports = router;