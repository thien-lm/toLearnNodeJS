const Course = require('../models/Course');
const { multipleToObject } = require('../../util/convertToObject'); // ../ == back to parent folder

class SiteController {
    //[GET]
    index(req, res, next) {
        Course.find({})
            .then((course) => {
                res.render('home', {
                    course: multipleToObject(course), //return array of thoose collection in array
                });
            })
            .catch((er) => res.status(400).json({ error: 'ERROR!!!' }));
    }
    //serch
    search(req, res) {
        res.render('search');
    }

    login(req, res) {
        res.render('login')
    }
}

module.exports = new SiteController();
