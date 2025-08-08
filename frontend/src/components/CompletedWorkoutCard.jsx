import React from "react";
import {
  Box,
  Card,
  Text,
  Badge,
  Flex,
  Menu,
  CloseButton,
  Dialog,
  Button,
  Portal,
} from "@chakra-ui/react";
import WorkoutTimerDisplay from "./WorkoutTimerDisplay";
import { Clock, Weight, Medal } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { EllipsisVertical } from "lucide-react";
import { useColorModeValue } from "../components/ui/color-mode";
import ExerciseTable from "./ExerciseTable";
import { useCompleteWorkoutsStore } from "@/store/completedWorkouts";

export default function CompletedWorkoutCard({
  name,
  exercises,
  workoutTemplate,
  duration,
  completedAt,
  id,
  data,
}) {
  const date = new Date(completedAt);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const { deleteCompletedWorkout } = useCompleteWorkoutsStore();

  //TODO DELETE COMPLETED WORKOUT USE store
  const handleDeleteCompletedWorkout = async (id) => {
    try {

      await deleteCompletedWorkout(id);
      console.log(`Completed workout ${id} deleted successfully`);
    } catch (error) {
      console.error("Error inhandle DeleteCompletedWorkout", err);
    }
  };

  return (
    <Box w="full" position="relative">
      {/*The Delete confirmation alert when trying to delete a workout */}
      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onDelete={() => handleDeleteCompletedWorkout(id)}
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

      {/** WORKOUT CARD THAT ON CLICKS OPENS INFO ABOUT WORKOUT *** */}
      <Dialog.Root
        size="cover"
        placement="center"
        motionPreset="slide-in-bottom"
        scrollBehavior="inside"
      >
        <Dialog.Trigger asChild>
          <Card.Root
            width="full"
            minHeight="320px"
            variant="outline"
            display="flex"
            flexDirection="column"
            cursor="pointer"
            _hover={{
              shadow: "md",
              bg: useColorModeValue("gray.50", "gray.900"),
              transition: "all 0.2s",
            }}
            role="button"
            aria-label={`View details for completed workout ${name}`}
          >
            <Card.Body gap="2">
              <Card.Title mt="2">{name}</Card.Title>
              <Text fontSize="sm">
                {date.toLocaleDateString()} kl.{" "}
                {date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
            <Card.Footer px="4">
              <Flex justifyContent="flex-start" gap="2" flexWrap="wrap">
                <Badge variant="subtle" colorPalette="blue">
                  <Clock size={14} />
                  <WorkoutTimerDisplay seconds={duration} />
                </Badge>
                <Badge variant="subtle" colorPalette="green">
                  <Weight size={14} />
                  {data?.summary?.totalVolume ?? 0} kg
                </Badge>
                <Badge variant="subtle" colorPalette="yellow">
                  <Medal size={14} />2 PR
                </Badge>
              </Flex>
            </Card.Footer>
          </Card.Root>
        </Dialog.Trigger>

        {/**The dialog that opens when you click the completed Workout*/}
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

                  <Text my="2">Training Volume</Text>
                  <Flex justifyContent="flex-start" gap="2" flexWrap="wrap">
                    {Object.entries(data.muscleGroupVolume).map(
                      ([muscle, volume]) => (
                        <Badge key={muscle} colorPalette="green">
                          {muscle}: {volume}
                        </Badge>
                      )
                    )}
                  </Flex>
                </Flex>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
