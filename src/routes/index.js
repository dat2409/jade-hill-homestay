const staticPagesRouter = require('./staticPages');
const homestays = require('./homestays');
const userRouter = require('./user');
const auth = require('../app/middleware/auth');

function route(app) {
  app.use('/homestays', auth.requireAuth, homestays);
  app.use('/', staticPagesRouter);
  app.use('/users', auth.requireAuth, userRouter);
}

module.exports = route;
