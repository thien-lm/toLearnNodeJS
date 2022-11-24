const path = require('path')
const express = require('express')
const app = express()
const { engine  } = require('express-handlebars')
const port = 3000
const morgan = require('morgan')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
//http logger
//app.use(morgan('combined'))

//template engine
app.engine('hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resource/views'))

 
app.get("/", (req, res) => {
    res.render('home')
})

app.get("/linh", (req, res) => {
    res.render('news') 
})

app.get("/search", (req, res) => {
    console.log(req.query.q)
    res.render('search') 
})

app.post("/search", (req, res) => {
    //recive data from client by POST method
    console.log(req.body)
    res.send('search') 
})


app.listen(port, () => console.log('example app')) 