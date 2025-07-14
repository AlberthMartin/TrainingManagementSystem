import React from "react";
import { useWorkoutStore } from "@/store/workouts";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { TimerReset } from "lucide-react";
import { useColorModeValue } from "./ui/color-mode";
import WorkoutTimerDisplay from "./WorkoutTimerDisplay";
import { useActiveWorkoutStore } from "@/store/activeWorkout";

export default function ActiveWorkoutBottomBar({seconds}) {
  const activeWorkout = useActiveWorkoutStore((state) => state.activeWorkout);

  if (!activeWorkout?._id) return null;

  const bg = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Link to={`/activeWorkout/${activeWorkout?._id}`}>
      <Box
        shadow="md"
        borderTop="1px solid"
        borderColor={borderColor}
        position="fixed"
        bottom="0"
        left="20"
        right="0"
        h="12"
        bg={bg}
        zIndex="999"
        px={4}
        _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
        transition="background-color 0.2s ease"
        cursor="pointer"
        align="center"
      >
        <Flex justify="center" align="center" h="full" w="full" gap={4}>
          <Text fontWeight="medium">{activeWorkout.name}</Text>
          <Flex align="center" gap={2}>
            <Icon as={TimerReset} boxSize={4} />
            <WorkoutTimerDisplay seconds={seconds} />
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
}
