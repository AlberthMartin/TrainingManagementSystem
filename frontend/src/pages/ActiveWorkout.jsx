import React from "react";
import { useActiveWorkoutStore } from "@/store/activeWorkout";
import { useParams } from "react-router-dom";
import { Box, Stack } from "@chakra-ui/react";
import WorkoutForm from '@/components/WorkoutForm'

export default function ActiveWorkout() {
  const activeWorkout = useActiveWorkoutStore((state) => state.activeWorkout);
  const {workoutId} = useParams();

  if (!activeWorkout?._id) return null;
  
  return (
    <Box ml="20" mb="12">
      <Stack>
        <WorkoutForm workoutId={workoutId} mode="log" />
      </Stack>
    </Box>
  );
}
