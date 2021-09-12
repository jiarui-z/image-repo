require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("./db/connection");
require("./config/passport")(passport);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/images", require("./routers/images"));
app.use("/users", require("./routers/users"));

module.exports = app;
