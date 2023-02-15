const Course = require('../models/Course');
const User = require('../models/User');
const fs = require('fs');
var nodemailer = require('nodemailer');
const PlayList =require('../models/playList');

// const PlayLissst =require('../../public/video');
const { multipleToObject, toObject } = require('../../util/convertToObject'); // ../ == back to parent folder

class SiteController {

    //scene for play video
    showHTML(req, res, next) {
        res.render('testMp4Player')
    }

    //play video
    playVideo(req, res, next) {
        const range = req.headers.range
        console.log(range)
        const videoPath = 'src/public/video/vaoDayMaAnTao.mp4';
        const videoSize = fs.statSync(videoPath).size
        const chunkSize = 1 * 1e6;
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + chunkSize, videoSize - 1)
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
    }

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
        console.log(req.user.email)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'thikhanhlinhle69@gmail.com',
              pass: process.env.PASSWORD
            }
          });
          
          var mailOptions = {
            from: 'thikhanhlinhle69@gmail.com', 
            to: '' + req.user.email,
            subject: 'Sending Email using Node.js',
            text: `Hi thien, hope u have a nice day!!!.`,      
            html: '<h1>Welcome</h1><p>That was easy!</p><br>Hi thien, hope u have a nice day!!!</br>'  
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) { 
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          res.redirect('/')
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
