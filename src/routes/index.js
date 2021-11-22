const staticPagesRouter = require('./staticPages');
const userRouter = require('./user');

function route(app) {
    app.use('/', staticPagesRouter);
    app.use('/users', userRouter);
}

module.exports = route;
