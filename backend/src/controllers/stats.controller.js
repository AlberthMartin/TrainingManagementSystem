import CompletedWorkout from "../models/completedWorkout.model";

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

IN THE FRONTEND: 
Line Chart for weekly volume
Pie Chart for muscle group distribution
*/

export const getWeeklyVolume = async(req, res) => {
    try{
        CompletedWorkout.aggregate([
            {
                $match: {}
            }
        ])

    } catch(error){
        console.log("getWeeklyVolume", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
    }
}

