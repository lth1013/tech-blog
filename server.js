require('dotenv');

const express = require('express');
const path = require('path');
const session = require('express-session');
const handlebars = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('models/Comment.js');
require('models/Post.js');
require('models/User.js');

const app = express(); 
const PORT = process.env.PORT || 3001; 

const hb = handlebars.create({}); 

const sessions = {
  secret: 'Super secret secret',
  cookie: {
      maxAge: 3600000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

app.use(session(sessions));

app.engine('handlebars', hb.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('The app is now listening on PORT 3001'));
});