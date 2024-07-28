const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const { init } = require('./models');
const router = require('./routes');


const app = express();
app.use(express.static(path.join(__dirname, './public')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
// Sessions
app.use(session({
  secret: 'kuroshiro1902',
  resave: false,
  saveUninitialized: true
}));
// Middleware để thiết lập res.locals.user
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await init();
  console.log(`Server is running on port ${PORT}`);
});
