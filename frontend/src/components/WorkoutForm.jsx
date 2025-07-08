import {
  Portal,
  Flex,
  InputGroup,
  CloseButton,
  ButtonGroup,
  IconButton,
  Avatar,
  Container,
  Box,
  Input,
  Heading,
  Button,
  Stack,
  Dialog,
} from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useState, useEffect } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useWorkoutStore } from "@/store/workout";
import { useExerciseStore } from "@/store/exercise";
import { useNavigate } from "react-router-dom";
import { Plus, Search, X } from "lucide-react";
import DisplayExerciseInWorkout from "@/components/DisplayExerciseInWorkout";

export default function WorkoutForm({ workoutId }) {
  const inputFieldColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const navigate = useNavigate();

  const isEdit = Boolean(workoutId);

  const fetchExercises = useExerciseStore((state) => state.fetchExercises);
  const exercises = useExerciseStore((state) => state.exercises);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [open, setOpen] = useState(false); //Exercise Dialog open state

  const filteredExercises = exercises.filter(
    (exercise) =>
      //So the .toLowerCase function waits until the exercise name is here when you add a new exercise
      typeof exercise.name === "string" &&
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const [newWorkout, setNewWorkout] = useState({
    name: "",
    exercises: [],
  });

  const { createWorkout, fetchWorkout, updateWorkout } = useWorkoutStore();

  //If a workout is being edited fetch the values
  useEffect(() => {
    if (isEdit && workoutId) {
      fetchWorkout(workoutId)
        .then(({success, workout}) => {
          console.log("Fetched workout data:", workout);

          if (!success || !workout || !workout.name || !Array.isArray(workout.exercises)) {
            console.error("Invalid workout data fetched:", workout);
            toaster.create({
              title: "Error",
              description: "Failed to load workout data.",
              status: "error",
              type: "error",
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          setNewWorkout({
            name: workout.name,
            exercises: workout.exercises.map((ex) => ({
                ...ex,
                exercise: typeof ex.exercise === "object" ? ex.exercise._id : ex.exercise,
              })),
          });
        })
        .catch((error) => {
          console.error("Error fetching workout:", error);
          toaster.create({
            title: "Error",
            description: "Could not fetch workout",
            status: "error",
            type: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  }, [workoutId, isEdit]);

  const handleSaveWorkout = async () => {
    const isValidWorkout = newWorkout.exercises.every((ex) =>
      ex.sets.every(
        (set) =>
          typeof set.reps === "number" &&
          set.reps >= 0 &&
          typeof set.restSeconds === "number" &&
          set.restSeconds >= 0 &&
          typeof set.weight === "number" &&
          set.weight >= 0 &&
          typeof set.setType === "number" &&
          set.setType >= 1
      )
    );

    if (!isValidWorkout) {
      toaster.create({
        title: "Invalid input",
        description: "Make sure all sets have valid numbers",
        status: "error",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!newWorkout.name.trim()) {
      toaster.create({
        title: "Invalid input",
        description: "The workout needs a name",
        status: "error",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isEdit) {
      const { success, message } = await updateWorkout(workoutId, newWorkout);
      if (!success) {
        toaster.create({
          title: "Error",
          description: message,
          status: "error",
          type: "error",
          duration: 3000,
          isClosable: "true",
        });
      } else {
        toaster.create({
          title: "Success",
          description: message,
          status: "success",
          type: "success",
          duration: 1000,
          isClosable: "true",
        });
        setTimeout(() => {
          navigate("/workouts");
        }, 1000);
      }
    } else {
      const { success, message } = await createWorkout(newWorkout);
      if (!success) {
        toaster.create({
          title: "Error",
          description: message,
          status: "error",
          type: "error",
          duration: 3000,
          isClosable: "true",
        });
      } else {
        toaster.create({
          title: "Success",
          description: message,
          status: "success",
          type: "success",
          duration: 1000,
          isClosable: "true",
        });
        setTimeout(() => {
          navigate("/workouts");
        }, 1000);
      }
    }
  };

  //Add exercise to the workout being created
  const handleAddExercise = async () => {
    const alreadyExists = newWorkout.exercises.some(
      (ex) => ex.exercise === selectedExerciseId
    );
    if (alreadyExists) {
      toaster.create({
        title: "Error",
        description: "Exercise already exists",
        status: "error",
        type: "error",
        duration: 3000, //Default 5 s now 3 s
        isClosable: "true",
      });
      return;
    }

    const newEx = {
      exercise: selectedExerciseId,
      sets: Array(2)
        .fill(null)
        .map(() => ({
          reps: 8,
          weight: 0,
          restSeconds: 60,
          setType: 1,
        })),
    };

    setNewWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newEx],
    })); //adds the exercise workout being created

    setSelectedExerciseId(""); //Resets the selected exercise id
    setOpen(false); //Closes the dialog after exercise is added
  };

  const addSetToExercise = (exerciseId) => {
    try {
      setNewWorkout((prev) => ({
        ...prev,
        exercises: prev.exercises.map((ex) =>
          ex.exercise === exerciseId
            ? {
                ...ex,
                sets: [
                  ...ex.sets,
                  {
                    reps: 0,
                    weight: 0,
                    restSeconds: 0,
                    setType: 1,
                  },
                ],
              }
            : ex
        ),
      }));
    } catch (error) {
      console.error("Error in createWorkout:", error);
    }
  };

  const removeSetFromExercise = (exerciseId, setIndex) => {
    setNewWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((ex) => {
          if (ex.exercise === exerciseId) {
            return {
              ...ex,
              sets: ex.sets.filter((_, i) => i !== setIndex),
            };
          }
          return ex;
        }),
      };
    });
  };

  const updateSetValue = (exerciseId, setIndex, field, value) => {
    setNewWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((ex) => {
          if (ex.exercise === exerciseId) {
            const updatedSets = [...ex.sets];
            updatedSets[setIndex] = {
              ...updatedSets[setIndex],
              [field]: value,
            };
            return {
              ...ex,
              sets: updatedSets,
            };
          }
          return ex;
        }),
      };
    });
  };

  return (
    <Container maxW="md" px="4" py="4" ml="20">
      <Stack>
        <Heading>{isEdit ? "Edit workout" : "Create new workout"}</Heading>

        <Box>
          <Stack>
            <Input
              placeholder="Workout name"
              name="name"
              value={newWorkout.name}
              variant="flushed"
              onChange={(e) =>
                setNewWorkout({ ...newWorkout, name: e.target.value })
              }
              bg={inputFieldColor}
              color={textColor}
              p="4"
            />

            {/*The already added exercises */}
            <Stack spacing={4}>
              {newWorkout.exercises.map((ex) => {
                const exerciseDetails = exercises.find(
                  (e) => e._id === ex.exercise
                );

                return (
                  exerciseDetails && (
                    <Box key={exerciseDetails._id}>
                      <DisplayExerciseInWorkout
                        name={exerciseDetails.name}
                        reps={ex.reps}
                        sets={ex.sets}
                        exerciseId={ex.exercise}
                        onAddSet={addSetToExercise}
                        onRemoveSet={removeSetFromExercise}
                        onUpdateSetValue={updateSetValue}
                      />
                    </Box>
                  )
                );
              })}
            </Stack>

            {/*Dialog to add exercises */}
            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
              <Dialog.Trigger asChild>
                <Button variant="outline">Add Exercise</Button>
              </Dialog.Trigger>
              {/*Exercises menu */}
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Choose an exercise to add</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <Stack>
                        {/*Search field */}
                        <Box p="4" w="full">
                          <Flex justify="flex-end">
                            <InputGroup
                              ml="4"
                              flex="1"
                              startElement={<Search />}
                            >
                              <Input
                                placeholder="Search exercises"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </InputGroup>
                          </Flex>
                        </Box>
                        <Heading fontWeight="semibold" fontSize="3xl" m="4">
                          Exercises
                        </Heading>
                        {/*Exercisese */}
                        <Flex direction="column" gap="2" pr="10">
                          {filteredExercises.map((exercise) => (
                            <ButtonGroup
                              key={exercise._id}
                              variant="outline"
                              isAttached
                              w="full"
                              pr="16"
                            >
                              <IconButton
                                aria-label={`${exercise.name} icon`}
                                w="auto"
                              >
                                <Avatar.Root shape="square">
                                  <Avatar.Fallback>
                                    {exercise.name.charAt(0)}
                                  </Avatar.Fallback>
                                </Avatar.Root>
                              </IconButton>

                              <Button
                                height="10"
                                w="full"
                                justifyContent="start"
                                p="4"
                                pl="6"
                                onClick={() =>
                                  setSelectedExerciseId(exercise._id)
                                }
                                variant={
                                  selectedExerciseId === exercise._id
                                    ? "solid"
                                    : "outline"
                                }
                              >
                                {exercise.name}
                              </Button>
                              {selectedExerciseId === exercise._id && (
                                <Button onClick={() => handleAddExercise()}>
                                  Add
                                </Button>
                              )}
                            </ButtonGroup>
                          ))}
                        </Flex>
                      </Stack>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Dialog.ActionTrigger>
                      <Dialog.ActionTrigger asChild>
                        <Button onClick={() => handleAddExercise()}>Add</Button>
                      </Dialog.ActionTrigger>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>

            <Button onClick={handleSaveWorkout}>
              {isEdit ? "Save Changes" : "Create Workout"}
            </Button>
            <Toaster />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
