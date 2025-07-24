import {
  VStack,
  Container,
  Box,
  Input,
  Heading,
  Button,
  Stack,
  createListCollection,
  Portal,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useExerciseStore } from "@/store/exercises";
import { useNavigate } from "react-router-dom";

export default function CreateExercisePage() {
  const inputFieldColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const navigate = useNavigate();

  const [newExercise, setNewExercise] = useState({
    name: "",
    description: "",
    primaryMuscleGroup: "",
    secondaryMuscleGroup: "",
    category: "",
  });

  const { createExercise } = useExerciseStore();

  const handleAddExercise = async () => {
    //TODO: Add validation
    const { success, message } = await createExercise(newExercise);

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
        navigate("/exercises");
      }, 1000);
    }
  };

  return (
    <Container maxW="md" px="4" py="4" ml="20">
      <Stack>
        <Heading mb="4">New exercise</Heading>

        <Box>
          <Stack>
            <Input
              placeholder="Exercise name"
              name="name"
              value={newExercise.name}
              onChange={(e) =>
                setNewExercise({ ...newExercise, name: e.target.value })
              }
              bg={inputFieldColor}
              color={textColor}
            />
            <Input
              placeholder="Description (optional)"
              name="description"
              value={newExercise.description}
              onChange={(e) =>
                setNewExercise({ ...newExercise, description: e.target.value })
              }
              bg={inputFieldColor}
              color={textColor}
            />
            {/*SELECT MUSCLE GROUP */}
            <Select.Root
              collection={MuscleGroups}
              value={newExercise.primaryMuscleGroup}
              onValueChange={(e) =>
                setNewExercise({ ...newExercise, primaryMuscleGroup: e.value })
              }
              mt="4"
            >
              <Select.HiddenSelect />
              <Select.Label>Select primary and secondary muscle groups</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select primary muscle group" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.ClearTrigger />
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>

              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {MuscleGroups.items.map((group) => (
                      <Select.Item key={group.value} item={group}>
                        {group.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            {/*SECONDARY MUSCLE GROUP */}
            <Select.Root
              collection={MuscleGroups}
              value={newExercise.secondaryMuscleGroup}
              onValueChange={(e) =>
                setNewExercise({ ...newExercise, secondaryMuscleGroup: e.value })
              }
              
            >
              <Select.HiddenSelect />
              {/*<Select.Label>Select secondary muscle group</Select.Label>*/}
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select secondary muscle group (optional)" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                <Select.ClearTrigger />
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>

              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {MuscleGroups.items.map((group) => (
                      <Select.Item key={`${group.value}secondary`} item={group}>
                        {group.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            {/*EXERCISE CATEGORYY */}
            <Select.Root
              collection={ExerciseCategories}
              value={newExercise.category}
              onValueChange={(e) =>
                setNewExercise({ ...newExercise, category: e.value })
              }
              mt="4"
            >
              <Select.HiddenSelect />
              <Select.Label>Exercise Category*</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Exercise Category" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                <Select.ClearTrigger />
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>

              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {ExerciseCategories.items.map((category) => (
                      <Select.Item key={`${category.value}category`} item={category}>
                        {category.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Button onClick={handleAddExercise} mt="4">Add Exercise</Button>
            <Toaster />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

const MuscleGroups = createListCollection({
  items: [
    { label: "Chest", value: "Chest" },
    { label: "Back", value: "Back" },
    { label: "Shoulders", value: "Shoulders" },
    { label: "Triceps", value: "Triceps" },
    { label: "Biceps", value: "Biceps" },
    { label: "Forearms", value: "Forearms" },
    { label: "Core", value: "Core" },
    { label: "Quadriceps", value: "Quadriceps" },
    { label: "Hamstrings", value: "Hamstrings" },
    { label: "Glutes", value: "Glutes" },
    { label: "Calves", value: "Calves" },
  ],
});

const ExerciseCategories = createListCollection({ 
    items: [
  { label: "Barbell", value: "Barbell" },
  { label: "Dumbbell", value: "Dumbbell" },
  { label: "Machine", value: "Machine" },
  { label: "Bodyweight", value: "Bodyweight" },
  { label: "Core", value: "Core" },
  { label: "Assisted Bodyweight", value: "Assisted Bodyweight" },
  { label: "Cardio", value: "Cardio" },
  { label: "Duration", value: "Duration" },
],
});

