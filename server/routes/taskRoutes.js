const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK

router.post("/", auth, async (req, res) => {

  try {

    const task = await Task.create({

      title: req.body.title,

      description: req.body.description,

      status: req.body.status,

      dueDate: req.body.dueDate,

      user: req.user.id

    });

    res.status(201).json(task);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// GET ALL TASKS

router.get("/", auth, async (req, res) => {

  try {

    const tasks = await Task.find({
      user: req.user.id
    });

    res.json(tasks);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// UPDATE TASK

router.put("/:id", auth, async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

    res.json(task);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// DELETE TASK

router.delete("/:id", auth, async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task Deleted"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;