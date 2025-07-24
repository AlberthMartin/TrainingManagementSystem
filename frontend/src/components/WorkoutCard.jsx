import { Button, Card } from "@chakra-ui/react";
import {
  Text,
  Flex,
  Box,
  CloseButton,
  Dialog,
  Portal,
  Menu,
  Badge,
} from "@chakra-ui/react";
import ExerciseTable from "./ExerciseTable";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWorkoutStore } from "@/store/workouts";
import { useActiveWorkoutStore } from "@/store/activeWorkout";
import { useState } from "react";

import { useColorModeValue } from "../components/ui/color-mode";
import { EllipsisVertical } from "lucide-react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

export default function WorkoutCard({ name, exercises = [], id, data }) {
  const secondaryTextColor = useColorModeValue("gray.700", "gray.400");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const setActiveWorkoutById = useActiveWorkoutStore(
    (s) => s.setActiveWorkoutById
  );

  const { deleteWorkout } = useWorkoutStore();

  const handleDeleteWorkout = async (id) => {
    try {
      await deleteWorkout(id);
      console.log(`Workout ${id} deleted successfully`);
    } catch (err) {
      console.error("Error in handleDeleteWorkout", err);
    }
  };

  const handleStartWorkout = async (id) => {
    try {
      await setActiveWorkoutById(id);
      console.log(`Workout ${id} started successfully`);
      navigate(`/activeWorkout/${id}`);
    } catch (error) {
      console.error("Error in handleStartWorkout", error);
    }
  };
  return (
    <Box w="full" position="relative">
      {/*The Delete confirmation alert when trying to delete a workout */}
      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onDelete={() => handleDeleteWorkout(id)}
        itemToBeDeleted={name}
      />

      {/**** MENU IN TOP RIGHT OF CARD      ***********/}
      <Box position="absolute" top="2" right="2" zIndex="10" p="2">
        {/*Menu on the card */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="ghost" size="sm">
              <EllipsisVertical size="22" />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {/*Edit */}
                <Link to={`/editWorkout/${id}`}>
                  <Menu.Item value="rename">Edit</Menu.Item>
                </Link>
                <Menu.Item
                  value="delete"
                  color="fg.error"
                  _hover={{ bg: "bg.error", color: "fg.error" }}
                  onClick={() => setIsDialogOpen(true)}
                  colorScheme="red"
                >
                  Delete...
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>

      {/** CARD THAT ON CLICKS OPENS A DIALOG *** */}
      <Dialog.Root
        size="cover"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Dialog.Trigger asChild>
          <Card.Root
            width="full"
            height="200px"
            variant="outline"
            display="flex"
            flexDirection="column"
            cursor="pointer"
            _hover={{
              shadow: "md",
              bg: useColorModeValue("gray.50", "gray.700"),
              transition: "all 0.2s",
            }}
            role="button"
            aria-label={`View details for workout ${name}`}
          >
            <Card.Body flex="1" overflow="hidden">
              <Card.Title mb="2">{name} </Card.Title>

              {/*The exercises in the workout listed ..., ... */}
              <Text fontSize="sm" color={secondaryTextColor}>
                {exercises?.length > 0
                  ? exercises.map((e) => e.exercise?.name).join(", ") + "."
                  : "No exercises added"}
              </Text>
            </Card.Body>
            <Card.Footer px="4" pb="4">
              <Flex justifyContent="flex-start" gap="2" flexWrap="wrap">
                {/*TODO: Make this render from workout info that is created when a 
              workout is made or edited */}
                {Object.entries(data.muscleGroupVolume).map(
                  ([muscle, sets]) => (
                    <Badge key={muscle} colorPalette="green">
                      {muscle}: {sets}
                    </Badge>
                  )
                )}
              </Flex>
            </Card.Footer>
          </Card.Root>
        </Dialog.Trigger>

        {/**The dialog that opens when you click the exercise */}
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{name}</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Flex direction="column" gap="2" ml="6">
                  {exercises?.length > 0 ? (
                    <ExerciseTable exercises={exercises} />
                  ) : (
                    "No exercises"
                  )}
                </Flex>
                {/*TODO* start workout button*/}
                <Link to={`/activeWorkout/${id}`}>
                  <Button m="6" onClick={() => handleStartWorkout(id)}>
                    Start Workout
                  </Button>
                </Link>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
