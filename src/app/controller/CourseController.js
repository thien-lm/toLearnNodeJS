const Course = require('../models/Course')
const { toObject }= require('../../util/convertToObject')
class CourseController {
    //[GET] news
    
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug})
            .then((course) => {
                res.render("courses/show", 
                 {course : toObject(course)}
                )
            })
            .catch(next)
      
    }
}

module.exports = new CourseController();
