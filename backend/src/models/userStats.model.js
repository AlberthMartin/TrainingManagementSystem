import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  volumePerWeek: {
    type: Map,
    of: Number,
    default: {},
  },
  setsPerWeek: {
    type: Map,
    of: Number,
    default: {},
  },
  lastUpdated: {},
},
{
  timestamps: true,
});

const UserStats = mongoose.model("UserStat", userStatsSchema )
export default UserStats