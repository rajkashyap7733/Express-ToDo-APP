const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config()

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const timerRoutes = require("./routes/timerRoutes");
const collaborationRoutes = require("./routes/collaborationRoutes");

const app = express();
// Middleware 
app.use(cors());
app.use(express.json());
 
// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/timers", timerRoutes);
app.use("/collaboration", collaborationRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.error(err));
