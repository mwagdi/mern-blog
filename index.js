const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
require('dotenv').config();

const users = require("./routes/api/user.routes");

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`,__dirname))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname))
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

app.use(bodyParser.json());


app.use(passport.initialize());

require("./passport")(passport);

app.use("/api/users", users);

app.use((err, req, res, next) => {
    console.log(err);
    next();
  });

// app.use(express.static(path.join(__dirname, "client", "build")))

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});