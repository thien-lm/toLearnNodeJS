const newsRouter = require('./news');
const courseRouter = require('./course');
const siteRouter = require('./site');
const meRouter = require('./me');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', courseRouter);
    app.use('/', siteRouter);
}

module.exports = route;
