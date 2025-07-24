import CompletedWorkout from "../models/completedWorkout.model.js";
import Workout from "../models/workout.model.js";
import {getWeeklyMuscleGroupVolume, getMuscleGroupVolumeForWorkout} from "../services/workoutStats.service.js"
/*Stats i should implement:
1.Workout frequency:
    Workouts per week

2. Duration
    Total time spent training per week

3. Volume
    Total volume per week: sets*reps*weight
    Per muscle group

4. Progress
    Personal bests: Max weight

5. Muscle Group Breakdown
    How often different muscle groups are trained
    weekly monthly

6. Calculate how many of each muscle is worked out in a workout

IN THE FRONTEND: 
Line Chart for weekly volume
Pie Chart for muscle group distribution
*/

/*Calculate the total volume per muscle group for a given finished workout
1 per set for primary muscle group and 0.5 per set for secondary muscle group
returning something like this: 
{
  Chest: 9,          // e.g., 9 sets where Chest was primary
  Shoulders: 4.5     // e.g., 9 sets where Shoulders was secondary
}
*/


export const getWeeklyVolume = async (req, res) => {
    try{
        const data = await getWeeklyMuscleGroupVolume(req.user._id)
        res.json({success: true, data: data})
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
      }
}

export const getWorkoutTemplateSetsPerMuscleGroup = async (req, res) => {
    try{
        const workout = Workout.findById(req.params.id);
        const data = await getMuscleGroupVolumeForWorkout(workout)
        res.json({success: true, data: data})
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
      }
}

export const getCompletedWorkoutSetsPerMuscleGroup = async (req, res) => {
    try{
        const workout = CompletedWorkout.findById(req.params.id)
        const data = await getMuscleGroupVolumeForWorkout(req.params.id)
        res.json({success: true, data: data})
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
      }
}