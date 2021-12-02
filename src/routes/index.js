const staticPagesRouter = require('./staticPages');
const homestays = require('./homestays');
const userRouter = require('./user');
const cityRouter = require('./city');
const serviceRouter = require('./service');
const auth = require('../app/middleware/auth');

function route(app) {
  app.use('/homestays', auth.requireAuth, homestays);
  app.use('/cities', auth.requireAuth, cityRouter);
  app.use('/services', auth.requireAuth, serviceRouter);
  app.use('/', staticPagesRouter);
  app.use('/users', auth.requireAuth, userRouter);
}

module.exports = route;
