const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// CONNECT MONGOOSE TO MONGODB
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('Mongoose connected to MongoDB'))
.catch(error => console.log(error.message));
mongoose.set('useFindAndModify', false);

// APP SETUP
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// REQUIRE ROUTES
const indexRoutes = require('./routes/index');

// USE ROUTES
app.use(indexRoutes);

// PORT LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listing on port ${port}`);
});