import React from "react";
import { Box, Card, Text, Badge, Flex } from "@chakra-ui/react";
import WorkoutTimerDisplay from "./WorkoutTimerDisplay";
import { Clock, Weight, Medal } from "lucide-react";

export default function CompletedWorkoutCard({
  name,
  exercises,
  workoutTemplate,
  duration,
  completedAt,
  id,
}) {
  const date = new Date(completedAt);
  return (
    <Card.Root width="full">
      <Card.Body gap="2">
        <Card.Title mt="2">{name}</Card.Title>
        <Text fontSize="sm">
          {date.toLocaleDateString()} kl.{" "}
          {date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Text fontSize="sm" fontWeight="semibold">
          {" "}
          Sets
        </Text>
        <Box as="ul" fontSize="sm">
          {exercises.map((ex, i) => (
            <li key={id + i}>
              {ex.sets?.length ?? 0} x {ex.exercise.name}
            </li>
          ))}
        </Box>
      </Card.Body>
      <Card.Footer justifyContent="flex-start">
        <Badge variant="subtle">
          <Clock size={14} />
          <WorkoutTimerDisplay seconds={duration} />
        </Badge>
        <Badge variant="subtle">
          <Weight size={14} />
          Volume
        </Badge>
        <Badge variant="subtle">
          <Medal size={14}/>2 PR
        </Badge>
      </Card.Footer>
    </Card.Root>
  );
}
