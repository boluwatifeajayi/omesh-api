const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const config = require('./config/database');
const mongoose = require("mongoose")
var cors = require('cors')


const app = express();

app.use(cors())
// Connect Database
connectDB();



// mongoose.connect(config.database,{ useNewUrlParser: true, useUnifiedTopology: true});
// let db = mongoose.connection;



// // check connection
// db.once('open', function(){
//     console.log('Connected to mongo db');
// });

// //check for db errors
// db.on('error', function(err){
//     console.log(err);
// });


// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/register', require('./routes/api/register'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/credits', require('./routes/api/credits'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
