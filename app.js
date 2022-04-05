const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3000;

// Use Static File
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/javaScript", express.static(__dirname + "public/javaScript"));
app.use("/images", express.static(__dirname + "public/images"));

app.use(bodyParser.urlencoded({ extended: true }));

// Data Base -> Mongoose
mongoose
  .connect(process.env.MONGO_COONNECTION_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

// create a data schema
const dataSchema = {
  searchQuery: String
}

const Data = mongoose.model("Data", dataSchema);

app.get("/", (req, res) => {
  app.use(express.static(path.join(__dirname, "style.css")));
  const file = `${path.resolve(__dirname)}/index.html`;
  res.sendFile(file);
});

app.get("/search", (req, res) => {
  const file = `${path.resolve(__dirname)}/public/search.html`;
  res.sendFile(file);
});

app.post("/search", (req, res) => {
  let newData = new Data({
    searchQuery: req.body.searchText,
  });
  
  newData.save();
});

// Handling non matching request from the client
app.use((req, res, next) => {
  const file = `${path.resolve(__dirname)}/public/pageNotFound.html`;
  res.status(404).sendFile(file);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
