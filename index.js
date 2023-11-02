const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const doctorsRouter = require('./routes/doctorsRouter');
const patientsRouter = require('./routes/patientsRouter');
const reportsRouter = require('./routes/reportsRouter');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const customWare = require('./config/middleware');

const app = express();
const port = process.env.PORT || 4080;

mongoose.connect('mongodb+srv://srivastavaapoorva104:QApKUdDRoHIUddx7@issuetracker.ldjqkn6.mongodb.net/?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(session({
  name: 'Hospital API',
  secret: 'Apoorva',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  }
}));

app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(flash());
app.use(customWare.setFlash)

// Use the routers
app.use((req, res, next) => {
  if (req.url == '/') {
   res.redirect('/doctors/register');
   return;
  }
   next();
 })
 
app.use('/doctors', doctorsRouter);
app.use('/patients', patientsRouter);
app.use('/reports', reportsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
