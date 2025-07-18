import { Text } from "@chakra-ui/react";

export default function WorkoutTimerDisplay({ seconds }) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedTime =
    hrs > 0
      ? `${hrs.toString().padStart(2, "0")}:${mins
          .toString()
          .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      : `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  return <Text>{formattedTime}</Text>;
}