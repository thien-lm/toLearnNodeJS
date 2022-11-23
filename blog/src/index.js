const path = require('path')
const express = require('express')
const app = express()
const { engine  } = require('express-handlebars')
const port = 3000
const morgan = require('morgan')

app.use(express.static(path.join(__dirname, 'public')))

//http logger
app.use(morgan('combined'))

//template engine
app.engine('hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resource/views'))

 
app.get("/", (req, res) => {
    res.render('home')
})

app.get("/news", (req, res) => {
    res.render('news') 
})


app.listen(port, () => console.log('example app')) 