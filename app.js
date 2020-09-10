const express = require('express');
const app = express();

// REQUIRE ROUTES
const indexRoutes = require('./routes/index');

// USE ROUTES
app.use(indexRoutes);

// PORT LISTENING
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listing on port ${port}`);
});