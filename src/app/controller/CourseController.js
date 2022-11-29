const Course = require('../models/Course')
const { toObject, multipleToObject }= require('../../util/convertToObject')
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

    create(req, res, next) {
        res.render("courses/create")
      
    }

    store(req, res, next) {
        //res.json(req.body)//body: dulieu tu clienrt
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect("/"))
            .catch("404 ERROR")
    }
    //:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: toObject(course) 
            }))
            .catch(next)
      
    }
    //put
    update(req, res, next) {
        Course.updateOne({_id : req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
}

module.exports = new CourseController();
