const Course = require('../models/Course');
const { multipleToObject } = require('../../util/convertToObject');
class CourseController {
    //[GET] news

    show(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('me/stored-courses', {
                courses: multipleToObject(courses)
            })
        })
            .catch(next)
    }
}

module.exports = new CourseController();