const Course = require('../models/Course');
const User = require('../models/User');
const PlayList =require('../models/playList');

const { multipleToObject, toObject } = require('../../util/convertToObject'); // ../ == back to parent folder

class SiteController {
    //show ide

    showIDE(req, res, next) {
        res.render('IDE')
    }


    //[GET]
    index(req, res, next) {
        Course.find({})
            .then((course) => {
                res.render('login',  {
                    layout: 'mainGuest',
                    course: multipleToObject(course), //return array of thoose collection in array
                });
            })
            .catch((er) => res.status(400).json({ error: 'error cause by login!!!' }));
    }
    //for user after log
    user(req, res, next) {
        if(req.isAuthenticated()){
            PlayList.find({})
            .then((playList) => {
                res.render('home',  {
                    playList: multipleToObject(playList), //return array of thoose collection in array
                });
            })
            .catch((er) => res.status(400).json({ error: 'ERROR!!!' }));
    }
    else res.end('time out')
}    
    //serch
    search(req, res) {
        res.render('search');
    }


    login(req, res) {
        res.render('login')
    }

    loginPost(req, res, next) {

    }

    checkLogin(req, res, next) {
        // console.log("siuuuu: " + req.body.email)
        User.findOne({email: req.body.email})
            .then(user => {
                if(user != null) {
                    let userLogin = user.toObject();
                    if(userLogin.password == req.body.password) {
                    //show main layout when user login
                        Course.find({})
                        .then((course) => {
                            res.render('home',  {
                                course: multipleToObject(course), //return array of thoose collection in array
                            });
                        })
                        .catch((er) => res.status(400).json({ error: 'ERROR!!!' }));


                        console.log('login OK')
                        consolel.log('session: ', req.sessionID)
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
        res.clearCookie('connect.sid');
        res.redirect('/');
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
