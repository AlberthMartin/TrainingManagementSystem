import { useWorkoutStore } from "@/store/workouts";
import {
  Box,
  Stack,
  Heading,
  Text,
  Flex,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import { useColorModeValue } from "../components/ui/color-mode";
import CardGrid from "@/components/CardGrid";

export default function WorkoutsPage() {
  const TaskBarBG = useColorModeValue("gray.100", "gray.900");

  const fetchWorkouts = useWorkoutStore((state) => state.fetchWorkouts);
  const workouts = useWorkoutStore((state) => state.workouts);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return (
    <Box ml="20">
      <Stack>
        {/*Top Taskbar */}
        <Box
          position="sticky"
          top="0"
          zIndex="sticky"
          bg={TaskBarBG}
          shadow="md"
          py="4"
        >
          <Flex justify="flex-end">
            {/*Create workout*/}
            <Link to="/createWorkout">
              <Button
                variant="ghost"
                fontSize="md"
                py="4"
                mx="4"
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                <Plus size={16} />
                <Text fontWeight="semibold">Create</Text>
              </Button>
            </Link>
          </Flex>
        </Box>

        <Heading fontWeight="semibold" fontSize="3xl" m="4">
          Workouts
        </Heading>

        {/*Workout cards */}
        <CardGrid>
          {workouts.map((workout, i) => (
            <WorkoutCard
              key={workout._id || i}
              id={workout._id}
              name={workout.name}
              exercises={workout.exercises}
              data = {workout}
            />
          ))}
          </CardGrid>
        
      </Stack>
    </Box>
  );
}
