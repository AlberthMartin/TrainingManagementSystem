import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/userAuth";
import { useCompleteWorkoutsStore } from "@/store/completedWorkouts";
import VolumeCard from "@/components/VolumeCard";
import WeeklySetsCard from "@/components/WeeklySetsCard";
import { SimpleGrid } from "@chakra-ui/react";
import CompletedWorkoutCard from "@/components/CompletedWorkoutCard";
import CardGrid from "@/components/CardGrid";

export default function HomePage() {
  const { authUser } = useAuthStore();

  const completedWorkouts = useCompleteWorkoutsStore((state) => state.completedWorkouts);
    
    const fetchCompletedWorkouts = useCompleteWorkoutsStore(
      (state) => state.fetchCompletedWorkouts
    );
  
    useEffect(() => {
      fetchCompletedWorkouts();
    }, [fetchCompletedWorkouts]);

  //Last three completed workouts
  const lastThree = [...completedWorkouts].slice(0, 3);

  return (
    <Box ml="32" mt="10">
      <Stack>
        <Heading fontSize={24}>
          Welcome back {authUser?.name || "User"}!
        </Heading>
        <Heading fontSize={18}>Weekly Stats</Heading>
        <CardGrid
          columns={{ base: 1, sm: 2 }}
          spacing="4"
          gap="2"
          px="4"
          w="full"
        >
          <VolumeCard />
          <WeeklySetsCard />
        </CardGrid>
        <Heading>Last performed workouts</Heading>
        <CardGrid
          columns={{ base: 1, sm: 3 }}
          spacing="4"
          gap="2"
          px="4"
          w="full"
        >
          {lastThree.map((cw) => (
            <CompletedWorkoutCard
              key={cw._id}
              id={cw._id}
              name={cw.name}
              workoutTemplate={cw.workoutTemplate}
              exercises={cw.exercises}
              duration={cw.duration}
              completedAt={cw.completedAt}
              data={cw}
            />
          ))}
        </CardGrid>
      </Stack>
    </Box>
  );
}
