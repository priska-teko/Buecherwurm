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
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mit der Datenbank verbunden");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("Warten auf Anfragen an Port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });


