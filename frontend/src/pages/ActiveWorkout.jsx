import React from "react";
import { useWorkoutStore } from "@/store/workout";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Text, Icon, Button } from "@chakra-ui/react";

export default function ActiveWorkout() {
  const activeWorkout = useWorkoutStore((state) => state.activeWorkout);
  const navigate = useNavigate();

  const { setActiveWorkout } = useWorkoutStore();

  if (!activeWorkout?._id) return null;

  const handleFinnishWorkout = async () =>{
    setActiveWorkout(null)
    //Save it somehow?
    navigate("/home")

  }

  return <Box ml="20"> 
  <Button onClick={()=> handleFinnishWorkout()}>
    Finnish Workout
    </Button> 
    </Box>;
}
