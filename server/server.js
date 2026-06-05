const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dns").setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// Routes

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


// MongoDB Connect

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected");

  app.listen(process.env.PORT, () => {

    console.log(
      `Server running on port ${process.env.PORT}`
    );

  });

})

.catch((err) => {

  console.log(err);

});