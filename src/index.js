const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config({ path: 'src/.env' });
// Connect to db
db.connect();

// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(morgan('combined'));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride('_method'));
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LogRocket Express API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [`${__dirname}/routes/*.js`],
};
const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Routes init
route(app);

app.listen(port);
