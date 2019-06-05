const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs =require('fs')
const postRoutes = require('./routes/post');
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
.then(()=>{
    console.log("DB Connected");
});

mongoose.connection.on('error', err => {
    console.log(err);
});

app.get('/',(req,res)=>{
  fs.readFile('docs/apiDocs.json',(err,data)=>{
    if(err){
      res.status(400).json({
        "error":err
      })
    }
    const docs =JSON.parse(data);
    res.json(docs)
  })
})

app.use(morgan('dev'));
app.use(body_parser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use('/', postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
          message:"UnAuthorised User!!"
      })
    }
  });


const port = Number(process.env.port) || 3000;
app.listen(port);