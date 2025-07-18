import CompletedWorkout from "../models/completedWorkout.model.js";
import mongoose from "mongoose";

//Backend API for completed Workouts for a user
//CRUD

export const getCompletedWorkouts = async (req, res) => {
  try {
    const completedWorkouts = await CompletedWorkout.find({
      user: req.user._id,
    }).populate("exercises.exercise");

    res.status(200).json({ success: true, data: completedWorkouts });
  } catch (error) {
    console.log("Error in getCompletedWorkouts", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const saveCompletedWorkout = async (req, res) => {
  try {
    const { name, exercises, workoutTemplate, duration, completedAt } =
      req.body;

    //validate
    if (
      !name ||
      !Array.isArray(exercises) ||
      !workoutTemplate ||
      typeof duration !== "number" ||
      isNaN(Date.parse(completedAt))
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, exercises, workoutTemplate, duration and completedAt are required",
      });
    }

    for (const ex of exercises) {
      if (!ex.exercise || !Array.isArray(ex.sets)) {
        return res.status(400).json({
          success: false,
          message: "Each exercise must have a valid ID and an array of sets",
        });
      }
    }

    //Create the object to be saved:
    const savedWorkout = new CompletedWorkout({
      name,
      exercises,
      user: req.user._id,
      workoutTemplate,
      duration,
      completedAt,
    });

    await savedWorkout.save();

    res.status(200).json({ success: true, data: savedWorkout });
  } catch (error) {
    console.log("Error in saveCompletedWorkout", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteCompletedWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid workout Id" });
    }

    const deletedCompletedWorkout = await CompletedWorkout.findByIdAndDelete(
      id
    );
    res.status(200).json({
      success: true,
      data: deletedCompletedWorkout,
      message: "Completed workout deleted",
    });
  } catch (error) {
    console.log("Error in deleteCompletedWorkout", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const updateCompletedWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const completedWorkout = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid completed workout Id" });
    }

    const updatedCompletedWorkout = await CompletedWorkout.findByIdAndUpdate(
      id,
      completedWorkout,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Completed workout updated",
      data: updatedCompletedWorkout,
    });
  } catch (error) {
    console.log("Error in updateCompletedWorkout", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
