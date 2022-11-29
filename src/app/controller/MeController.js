const { multipleToObject }= require('../../util/convertToObject')// ../ == back to parent folder 
const Course = require('../models/Course')
class MeController {

    //[GET]
    storedCourses(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('me/stored-courses', {
                courses: multipleToObject(courses)
            })
        })
            .catch(next)
    }
}

module.exports = new MeController();
