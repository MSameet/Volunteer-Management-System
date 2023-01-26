const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const url = process.env.DB_CONNECTIONURL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.on("connected", function () {
  console.log("MongoDB connected successfully...");
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
