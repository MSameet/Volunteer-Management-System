const express = require("express");
require("./db/mongoose");
const app = express();
const user = require("./routes/user");
const event = require("./routes/event");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 2000;

let corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use("/user", user);
app.use("/event", event);

app.listen(port, () => {
  console.log(`sever is running on port ${port}`);
});
