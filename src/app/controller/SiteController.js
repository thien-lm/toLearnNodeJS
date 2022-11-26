class SiteController {
    //[GET] 
    index(req, res) {
        res.render('home')
    }
    //serch
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController