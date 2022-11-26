class NewsController {
    //[GET] news
    index(req, res) {
        res.render('news')
    }
    
    show(req, res) {
        res.end('./public/img/linh1.jpg')
    }
}

module.exports = new NewsController