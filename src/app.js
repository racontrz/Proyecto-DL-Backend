const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes.js');
const authRoutes = require('./routes/auth.routes.js');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173',
  credentials: true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json ({message: 'Hello World Api!'}));
app.use('/api', routes);
app.use('/api', authRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: err.message
  });
});


module.exports = app