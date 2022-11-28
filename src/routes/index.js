const newsRouter = require('./news');
const courseRouter = require('./course');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', courseRouter)
    app.get('/', siteRouter);
}

module.exports = route;
