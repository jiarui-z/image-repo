const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connection");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/images", require("./routers/images"));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
