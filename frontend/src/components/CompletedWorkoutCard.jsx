import React from "react";
import { Box, Card, Text, Badge, Flex } from "@chakra-ui/react";
import WorkoutTimerDisplay from "./WorkoutTimerDisplay";
import { Clock, Weight, Medal } from "lucide-react";
import { useState } from "react";

export default function CompletedWorkoutCard({name, exercises, workoutTemplate, duration, completedAt, id,}) {
  
  const date = new Date(completedAt);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


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
        <Flex justifyContent="flex-start" direction="column" gap="1">
          {exercises.map((ex, i) => (
            <li key={id + i}>
              {ex.sets?.length ?? 0} x {ex.exercise.name}
            </li>
          ))}
          </Flex>
        </Box>
      </Card.Body>
      <Card.Footer px="4" pb="4">
        <Flex justifyContent="flex-start"  gap="2" flexWrap="wrap">
          <Badge variant="subtle">
            <Clock size={14} />
            <WorkoutTimerDisplay seconds={duration} />
          </Badge>
          {/*TODO: Make something that can calculate this stats 
        when completing a workout*/}
          <Badge variant="subtle">
            <Weight size={14} />
            Volume
          </Badge>
          <Badge variant="subtle">
            <Medal size={14} />2 PR
          </Badge>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
}
