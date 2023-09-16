const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

// Import and mount your route files here
const eventsRouter = require("./routes/events");
const newsRouter = require("./routes/news");
const photosRouter = require("./routes/photos");
const contactRouter = require("./routes/contact");

// Create an Express.js application
const app = express();
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (update the MongoDB URI)
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To School Website");
});

// Mount the routes
app.use("/api/events", eventsRouter);
app.use("/api/news", newsRouter);
app.use("/api/photos", photosRouter);
app.use("/api/contact", contactRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
