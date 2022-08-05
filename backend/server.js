const express = require("express");
const path = require("path");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 5000;

//Connect To Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  res.status(200).json({ message: "Welcome to the support desk api" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//Serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
