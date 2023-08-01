var express = require ("express");
var path = require ("path");
var cookieParser = require ("cookie-parser");
var logger = require ("morgan");

require("dotenv").config();

var indexRouter = require ("./routes/index")

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api",indexRouter);

app.listen(process.env.port || 3000,function(){
  console.log('now listening for requests Fares')
});
module.exports = app