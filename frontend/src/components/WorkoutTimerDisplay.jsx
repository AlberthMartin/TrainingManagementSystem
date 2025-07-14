import React from "react";
import {Text} from "@chakra-ui/react";

export default function WorkoutTimerDisplay({ seconds }) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return <Text fontWeight="bold"> {mins}:{secs}</Text>;
  }