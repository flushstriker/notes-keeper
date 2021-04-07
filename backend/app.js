const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const Note = require('./models/note');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');

app.use(cors());
require('dotenv').config();
app.set('views', path.join(__dirname, 'backend'));
const port = process.env.port || 3001;
const dbUrl = process.env.db_uri;
mongoose.connect(dbUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to the database");
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/user', userRoute);


app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})