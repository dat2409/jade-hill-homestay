const staticPagesRouter = require('./staticPages');
const homestays = require('./homestays');

function route(app) {
    app.use('/homestays', homestays);
    app.use('/', staticPagesRouter);
}

module.exports = route;
