const Course = require('../models/Course')


class SiteController {
    //[GET]
    index(req, res) {
        Course.find({}, (err, course) => {
            if(!err) res.json(course)
            else res.status(400).json({error: "ERROR!!!"})
    
        });
    }
    //serch
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
