//Exercises overview page, lists all the saved exercises in the appliaction
//Ability to edit them and delete them
import React, { useEffect, useState } from "react";
import ExerciseListElement from "@/components/ExerciseListElement";
import {
  Flex,
  Box,
  Heading,
  Button,
  ButtonGroup,
  IconButton,
  VStack,
  Stack,
  Input,
  InputGroup,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import { useExerciseStore } from "@/store/exercises";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useColorModeValue } from "../components/ui/color-mode";

export default function ExercisesPage() {
  const TaskBarBG = useColorModeValue("gray.100", "gray.900");

  const fetchExercises = useExerciseStore((state) => state.fetchExercises);
  const exercises = useExerciseStore((state) => state.exercises);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredExercises = exercises.filter(
    (exercise) =>
      //So the .toLowerCase function waits until the exercise name is here when you add a new exercise
      typeof exercise.name === "string" &&
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return (
    <Box ml="20" overflowX="clip">
      <Stack>
        <Box bg={TaskBarBG} shadow="md" py="4">
          <Flex justify="space-between" align="center" gap="4">
            <InputGroup ml="4" startElement={<Search />}>
              <Input
                placeholder="Search exercises"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <Link to="/createExercise">
              <Button
                variant="ghost"
                fontSize="xs"
                py="4"
                mx="4"
                _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
              >
                <Plus size={16} />
              </Button>
            </Link>
          </Flex>
        </Box>

        {/*Headline */}
        <Heading fontWeight="semibold" fontSize="3xl" m="2">
          Exercises
        </Heading>

        {/**Saved exercises with search function*/}
        <SimpleGrid columns={1} pl="4" pt="2" gap="1">
          {filteredExercises.map((exercise) => (
            <ExerciseListElement
              key={exercise._id}
              name={exercise.name}
              description={exercise.description}
              primaryMuscleGroup={exercise.primaryMuscleGroup}
              secondaryMuscleGroup={exercise.secondaryMuscleGroup}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
}
