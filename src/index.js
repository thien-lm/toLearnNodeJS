const path = require('path');
const express = require('express');
const app = express(); 
const { engine } = require('express-handlebars');
const dotenv = require('dotenv') 
dotenv.config({ path: "config.env" })
const port = process.env.PORT || 3000;
const morgan = require('morgan');

const routes = require('./routes');
const db = require('./config/db');

const cookieParser = require("cookie-parser");

app.use(cookieParser());
console.log(process.env.ADMIN_ID)
const initPassportLocal = require("./app/controller/passport/passportLocal");

initPassportLocal(); 

//passport... for login feature
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require('express-session')
//socketIO
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')

const methodOverride = require('method-override')
//conncet to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))

//for login feature
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000*2000 }
  }))

app.use(bodyParser.urlencoded({ extended: true }));
 
// app.use(require("express-session")({
//     secret: "Rusty is a dog",
//     resave: false,
//     saveUninitialized: false
// }));
 
app.use(passport.initialize());
app.use(passport.session());
 



//http logger
//app.use(morgan('combined'))

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);//app se su dung temlate engine la "engine()", ten dat la hbs
app.set('view engine', 'hbs');//app su dung view engine hbs
app.set('views', path.join(__dirname, 'resource', 'views'));//nhat bat ki trong thu muc view hoac resource


//socketIO
const io = new Server(server)
io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('on-chat', data=> {
    console.log(data)
    io.emit('user-chat', data)
  })
})
                     


//route init
routes(app);

server.listen(port, () => console.log('learning app')); //start a web server
