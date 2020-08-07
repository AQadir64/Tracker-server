require("./models/Track");
require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");
const trackRoutes = require("./routes/trackRoutes");
const app = express();
app.use(bodyParser.json());
app.use(authRoutes, trackRoutes);

app.get("/", requireAuth, (req, res) => {
  console.log(res.user);
  req.send(`your email is: ${res.user.email}`);
});

const mongoUri =
  "mongodb+srv://trackUser:track123456@track-cluster.elamq.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.log("error occured", err);
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
