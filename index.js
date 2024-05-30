
const express = require("express");
const db_connection = require('./config/connection')
const mongoose=require('mongoose')
const path = require("path");
const app = express();
const cors=require('cors')
const PORT = process.env.PORT || 3500;
const logEvent = require('./middlewares/logEvents')
const errorHandler = require('./middlewares/errorHandler')
const corsOption = require('./config/config')

//custom middleware
app.use(logEvent)
app.use(cors(corsOption))

//global middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,'public')))

app.use('/',require('./routes/root'))
app.use('/products',require('./routes/api/products'))
app.use('/register', require('./routes/api/register'))
app.use('/auth',require('./routes/api/auth'))
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler)
mongoose
  .connect(db_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((e) => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  });

