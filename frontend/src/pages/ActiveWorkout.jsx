import React from "react";
import { useWorkoutStore } from "@/store/workout";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Text, Icon, Button, Stack } from "@chakra-ui/react";
import WorkoutForm from '@/components/WorkoutForm'
import WorkoutTimerDisplay from "@/components/WorkoutTimerDisplay";

export default function ActiveWorkout() {
  const seconds = useWorkoutStore((s) => s.elapsedSeconds);

  const activeWorkout = useWorkoutStore((state) => state.activeWorkout);
  const navigate = useNavigate();
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
