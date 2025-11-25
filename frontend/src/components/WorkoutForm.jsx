import {Portal, Flex, InputGroup, CloseButton, ButtonGroup, IconButton, Avatar, Container, Box, Input, Heading, Button, Stack, Dialog,
} from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useState, useEffect } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useWorkoutStore } from "@/store/workouts";
import { useExerciseStore } from "@/store/exercises";
import { useNavigate } from "react-router-dom";
import { Plus, Search, X } from "lucide-react";
import DisplayExerciseInWorkout from "@/components/DisplayExerciseInWorkout";
import { useCompleteWorkoutsStore } from "@/store/completedWorkouts";
import { useActiveWorkoutStore } from "@/store/activeWorkout";
import { createToaster } from "@chakra-ui/react";

//This file is responsible for UI rendering of 3 pages create, edit and log workout
//mode === "edit" "create" "log" reflects the UI
export default function WorkoutForm({ workoutId, mode = "create" }) {
  const inputFieldColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const navigate = useNavigate();

  const { createWorkout, fetchWorkout, updateWorkout } = useWorkoutStore();

  const { saveCompletedWorkout } = useCompleteWorkoutsStore();
  const { setActiveWorkout, clearActiveWorkout } = useActiveWorkoutStore();

  const activeWorkout = useActiveWorkoutStore((state) => state.activeWorkout);

  //The mode the form should be in
  const isCreate = mode === "create";
  const isEdit = mode === "edit";
  const isLog = mode === "log";

  const fetchExercises = useExerciseStore((state) => state.fetchExercises);
  const exercises = useExerciseStore((state) => state.exercises);
  const getElapsedSeconds = useActiveWorkoutStore((s) => s.getElapsedSeconds);

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

  const [formData, setFormData] = useState({
    name: "",
    exercises: [],
  });

  const createToaster = (type, description, duration) => {
    toaster.create({
      title: type === "error" ? "Error" : "Success",
      description: description,
      status: type,
      type: type,
      duration: duration ? duration : 3000, //Default 3000
      isClosable: true,
    });
  };

  //If a workout is being edited or logged fetch the values
  useEffect(() => {
    if ((isEdit || isLog) && workoutId) {
      fetchWorkout(workoutId)
        .then(({ success, workout }) => {
          console.log("Fetched workout data:", workout);

          if (
            !success ||
            !workout ||
            !workout.name ||
            !Array.isArray(workout.exercises)
          ) {
            console.error("Invalid workout data fetched:", workout);

            createToaster("error", "Failed to load workout data.");

            return;
          }
          setFormData({
            name: workout.name,
            exercises: workout.exercises.map((ex) => ({
              ...ex,
              exercise:
                typeof ex.exercise === "object" ? ex.exercise._id : ex.exercise,
            })),
          });

          if (isLog && !activeWorkout) {
            setActiveWorkout(workout);
          }
        })
        .catch((error) => {
          console.error("Error fetching workout:", error);
          createToaster("error", "Could not fetch workout");
        });
    }
  }, [workoutId, isEdit, isLog]);

  const handleSaveWorkout = async () => {
    // Validate
    const isValidWorkout = formData.exercises.every((ex) =>
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
      createToaster("error", "Make sure all sets have valid numbers");
      return;
    }
    if (!formData.name.trim()) {
      createToaster("error", "The workout needs a name");
      return;
    }
    //Editing existing workout
    if (isEdit) {
      const { success, message } = await updateWorkout(workoutId, formData);
      if (!success) {
        createToaster("error", message);
      } else {
        createToaster("success", message, 1000);
        setTimeout(() => {
          navigate("/workouts");
        }, 1000);
      }
    }
    //Creating a new workout
    if (isCreate) {
      const { success, message } = await createWorkout(formData);
      if (!success) {
        createToaster("error", message);
      } else {
        createToaster("success", message, 1000);
        setTimeout(() => {
          navigate("/workouts");
        }, 1000);
      }
    }
    //Saving the log of a completed workout
    if (isLog) {
      const { name, exercises } = formData;
      const workoutTemplate = activeWorkout;
      const duration = getElapsedSeconds();
      const completedAt = new Date();

      const completedWorkout = {
        name,
        exercises,
        workoutTemplate,
        duration,
        completedAt,
      };

      const { success, message } = await saveCompletedWorkout(completedWorkout);

      if (!success) {
        createToaster("error", message);
      } else {
        clearActiveWorkout();
        navigate("/home");
      }
    }
  };

  const handleCancelActiveWorkout = async () => {
    

    clearActiveWorkout();
    navigate("/home");
  };

  //Add exercise to workout form
  const handleAddExercise = async () => {
    const alreadyExists = formData.exercises.some(
      (ex) => ex.exercise === selectedExerciseId
    );
    if (alreadyExists) {
      createToaster("error", "Exercise already exists");
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

    setFormData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newEx],
    })); //adds the exercise workout being created

    setSelectedExerciseId(""); //Resets the selected exercise id
    setOpen(false); //Closes the dialog after exercise is added
  };

  const handleRemoveExercise = async (exerciseId) => {
    setFormData((prev) => ({
      ...prev,
        exercises: prev.exercises.filter((ex) => ex.exercise !== exerciseId)
    })) 
  }

  const addSetToExercise = (exerciseId) => {
    try {
      setFormData((prev) => ({
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
    setFormData((prev) => {
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
    setFormData((prev) => {
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
        <Heading>
          {isLog
            ? `Active Workout`
            : isEdit
            ? "Edit Workout"
            : "Create New Workout"}
        </Heading>

        <Box>
          <Stack>
            <Input
              placeholder="Workout name"
              name="name"
              value={formData.name}
              variant="flushed"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              bg={inputFieldColor}
              color={textColor}
              p="4"
            />

            {/*The already added exercises */}
            <Stack spacing={4}>
              {formData.exercises.map((ex) => {
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
                        onRemoveExercise={handleRemoveExercise}
                        mode
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
              {isLog
                ? "Finish Workout"
                : isEdit
                ? "Save Changes"
                : "Create Workout"}
            </Button>
            {isLog && (
              <Button
                colorPalette="red"
                variant="outline"
                onClick={handleCancelActiveWorkout}
              >
                Cancel Workout
              </Button>
            )}
            <Toaster />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
