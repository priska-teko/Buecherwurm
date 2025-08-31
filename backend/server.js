require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/books");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/books", bookRoutes);

// connect to db
mongoose
  .connect("mongodb+srv://priskateko:fmuqayYzoX9qplSE@mernapp.rjbzq7p.mongodb.net/")
  .then(() => {
    console.log("mit der Datenbank verbunden");
    // listen to port
    app.listen(4000, () => {
      console.log("Warten auf Anfragen an Port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
