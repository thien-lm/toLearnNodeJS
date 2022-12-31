const Course = require('../models/Course');
const Comment = require('../models/Comment')
const { toObject, multipleToObject } = require('../../util/convertToObject');
class CourseController {

    // comment(req, res, next) {
    //     // req.body.name = req.user.name;
    //     req.body.name = req.user.name
    //     req.body.email = req.user.email
    //     req.body.video = req.body.videoID
    //     console.log(req.body)
        
    //     const comment = new Comment(req.body);
    //     comment
    //         .save()
    //         .then(() => res.redirect('back'))
    //         .catch('404 ERROR');
    // }
    comment(req, res, next) {
        console.log('cac')
        req.body.name = req.user.name
        req.body.email = req.user.email
        req.body.video = req.body.videoID
        // console.log(req.body)
        const comment = new Comment(req.body);
        // Comment.findOne({video: req.body.videoID}).then(next => {
        //     console.log(next)
        // })
        comment.save( {
            $push: {
                message: {name: req.user.name, message: req.body.message}
            }
        },
        (error, post) => {
            Comment.find({video:  req.body.videoID}).then(comment => res.send(multipleToObject(comment)))
        }
            
            )
    }
    //[GET] news

    show(req, res, next) {

        Course.findOne({ slug: req.params.slug })
          .then((course) => {
            Comment.find({video: course.videoId})
              .then((comment) => {    
                Course.find({}).
                    then((courses) => {
                        let randomNumber = Math.floor(Math.random()*3)
                                res.render('courses/show', { 
                                                course: toObject(course) ,
                                                courses: multipleToObject(courses).slice(randomNumber, randomNumber + 3 ),
                                                comment: multipleToObject(comment)}
                                             );
                })
            })
            }
            )
            .catch(next);
    }


    create(req, res, next) {
        res.render('courses/create');
    }

    store(req, res, next) {
        //res.json(req.body)//body: dulieu tu clienrt
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch('404 ERROR');
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

    //delete
    //put [delete]
    delete(req, res, next) {
        Course.deleteOne({_id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController();
