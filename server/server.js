const express = require("express");
require("./db/mongoose");
const app = express();
const appRoutes = require("./routes/");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const port = process.env.PORT || 2000;

let corsOptions = {
  origin: "http://localhost:3002",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "/public/faces/")));

app.use("/api", appRoutes);

app.listen(port, () => {
  console.log(`sever is running on port ${port}`);
});
