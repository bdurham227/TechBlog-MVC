const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

//require routes
const routes = require('./controllers');
// //require helpers
const helpers = require('./utils/helpers');

//sequelize 
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//create new environment of handlebars
const hbs = exphbs.create({ helpers });

//create session
// const sess = {
//     secret: 'Super secret secret',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     })
//   };

//   //middleware for sessions
//   app.use(session(sess));

//setup handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



//set middleware .use() for routes once we set them up
app.use(routes);



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Now listening, we are running on port ${PORT}`)
    })
});