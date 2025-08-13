import mongoose from "mongoose";

const userStats = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  VolumePerWeek: {},
  SetsPerWeek: {},
  lastUpdated: {}
});
