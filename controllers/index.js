const routes = require('express').Router(); 
const apiRoutes = require('./api'); 
const homepageRoutes = require('./homepageRoutes.js'); 
// const dashboardRoutes = require('./dashboardRoutes.js'); 

routes.use('/', homepageRoutes);
// routes.use('/', dashboardRoutes); 
routes.use('/api', require(apiRoutes));

module.exports = routes