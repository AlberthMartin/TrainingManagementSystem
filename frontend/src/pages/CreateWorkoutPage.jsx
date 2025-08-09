import React from "react";
import WorkoutForm from "@/components/WorkoutForm";
import { Box, Center } from "@chakra-ui/react";

export default function CreateWorkoutPage() {
  return (
    <Center bg="bg" shadow="md" borderRadius="md">
      <Box minWidth="600px">
      <WorkoutForm mode="create" />
      </Box>
    </Center>
  );
}
