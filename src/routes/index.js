const staticPagesRouter = require('./staticPages');
const homestays = require('./homestays');
const userRouter = require('./user');
const cityRouter = require('./city');
const serviceRouter = require('./service');
const auth = require('../app/middleware/auth');
const roomRouter = require('./room');

function route(app) {
  app.use('/homestays', homestays);
  app.use('/cities', auth.requireAuth, cityRouter);
  app.use('/services', auth.requireAuth, serviceRouter);
  app.use('/', staticPagesRouter);
  app.use('/roomTypes', auth.requireAuth, roomRouter);
  app.use('/users', auth.requireAuth, userRouter);
  app.use('/', staticPagesRouter);
}

module.exports = route;
