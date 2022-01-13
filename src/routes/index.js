const staticPagesRouter = require('./staticPages');
const homestays = require('./homestays');
const userRouter = require('./user');
const cityRouter = require('./city');
const serviceRouter = require('./service');
const booking = require('./booking');
const manageBooking = require('./manage-booking');
const schedule = require('./schedule');
const auth = require('../app/middleware/auth');
const roomRouter = require('./room');
const searchRouter = require('./search');

function route(app) {
  app.use('/booking', booking);
  app.use('/manage-booking', auth.requireAuth, manageBooking);
  app.use('/homestays', homestays);
  app.use('/cities', auth.requireAuth, cityRouter);
  app.use('/services', auth.requireAuth, serviceRouter);
  app.use('/', staticPagesRouter);
  app.use('/roomTypes', auth.requireAuth, roomRouter);
  app.use('/users', userRouter);
  app.use('/search', searchRouter);
  app.use('/', staticPagesRouter);
}

module.exports = route;
