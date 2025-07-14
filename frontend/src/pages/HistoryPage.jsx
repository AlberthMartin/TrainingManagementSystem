import React, { useEffect } from "react";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import CompletedWorkoutCard from "@/components/CompletedWorkoutCard";
import CardGrid from "@/components/CardGrid";
import { useWorkoutStore } from "@/store/workout";

export default function HistoryPage() {
  const completedWorkouts = useWorkoutStore((state) => state.completedWorkouts);
  const fetchCompletedWorkouts = useWorkoutStore(
    (state) => state.fetchCompletedWorkouts
  );

  useEffect(() => {
    fetchCompletedWorkouts();
  }, [fetchCompletedWorkouts]);

  return (
    <Box ml="20">
      <Stack>
        {/*Top Taskbar */}
        <Box position="sticky" top="0" zIndex="sticky" shadow="md" py="4"></Box>
        <Heading m="4" fontSize="xl">
          History
        </Heading>
        <CardGrid>
          {completedWorkouts.map((cw) => (
            <CompletedWorkoutCard
              key={cw._id}
              id={cw._id}
              name={cw.name}
              workoutTemplate={cw.workoutTemplate}
              exercises={cw.exercises}
              duration={cw.duration}
              completedAt={cw.completedAt}
            />
          ))}
        </CardGrid>
      </Stack>
    </Box>
  );
}
