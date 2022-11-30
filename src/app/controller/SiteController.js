const Course = require('../models/Course');
const User = require('../models/User');
const { multipleToObject, toObject } = require('../../util/convertToObject'); // ../ == back to parent folder

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

     checkLogin(req, res, next) {
        // console.log("siuuuu: " + req.body.email)
        User.findOne({email: req.body.email})
            .then(user => {
                if(user != null) {
                    let userLogin = user.toObject();
                    if(userLogin.password == req.body.password) {
                        setTimeout(()=> 2, 3000)
                        res.redirect('/')
                        console.log('login OK')
                    }
                    else {
                        res.send("wrong email or password")
                    }
                    }
                else res.send("user is not exist")
                })
                .catch(next)
                
    }

    signup(req, res) {
        res.render('signup');
    }
    //POST: store user
    store(req, res, next) {
        const user = new User(req.body);
        user
            .save()
            .then(() => res.render('login'))
            .catch('404 ERROR');
    }

}

module.exports = new SiteController();
