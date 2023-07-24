const newsRouter = require('./news');
const siteRouter = require('./sites');
const courseRouter = require('./courses');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/course', courseRouter);
    app.use('/', siteRouter);
}

module.exports = route;
