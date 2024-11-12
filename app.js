const express = require('express');
const userRoute = require('./routes/user.routes');
const indexRoute = require('./routes/index.routes');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user',userRoute);
app.use('/', indexRoute);

app.listen('3000' ,()=>{
    console.log("server is running")
    
} );