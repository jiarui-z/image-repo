const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./db/connection");
require("./config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/images", require("./routers/images"));
app.use("/users", require("./routers/users"));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
