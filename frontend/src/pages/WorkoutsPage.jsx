import { useWorkoutStore } from "@/store/workout";
import { Box, Stack, Heading, Text, Flex, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import { useColorModeValue } from "../components/ui/color-mode";

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
        <Box position="sticky" top="0" zIndex="sticky" bg={TaskBarBG} shadow="md" py="4">
          <Flex justify="flex-end">
            <Link to="/createWorkout">
              <Button
                variant="ghost"
                fontSize="md"
                py="4"
                mx="4"
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                <Plus size={16} />
                Create New Workout
                
              </Button>
            </Link>
          </Flex>
        </Box>

        <Heading fontWeight="semibold" fontSize="3xl" m="4">
          Workouts
        </Heading>

        <Flex wrap="wrap" gap="4" mx="8">
          {workouts.map((workout, i) => (
            <WorkoutCard
              key={workout._id}
              id={workout._id}
              name={workout.name}
              exercises={workout.exercises}
            />
          ))}
        </Flex>
      </Stack>
    </Box>
  );
}
