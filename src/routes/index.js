const staticPagesRouter = require('./staticPages');
const homestays = require('./homestays');
const userRouter = require('./user');

function route(app) {
    app.use('/homestays', homestays);
    app.use('/', staticPagesRouter);
    app.use('/users', userRouter);
}

module.exports = route;
