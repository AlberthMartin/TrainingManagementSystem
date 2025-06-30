//Exercises overview page, lists all the saved exercises in the appliaction
//Ability to edit them and delete them
import React, { useEffect } from 'react'
import ExerciseListElement from '@/components/ExerciseListElement'
import { Flex, Box, Heading, Avatar, Text, HStack, Container, Button, ButtonGroup, IconButton, VStack, Stack, StackSeparator } from "@chakra-ui/react"
import { useExerciseStore } from '@/store/exercise'
import { Link } from "react-router-dom"
import {Plus} from "lucide-react"
import { useColorModeValue } from '../components/ui/color-mode'


export default function ExercisesPage() {

    const TaskBarBG = useColorModeValue('gray.100', 'gray.900')

    const fetchExercises = useExerciseStore((state => state.fetchExercises))
    const exercises = useExerciseStore((state) => state.exercises)

    useEffect(() => {
        fetchExercises()
    }, [fetchExercises])

  return (
    <Box ml="20" overflowX="hidden"> 
    {/*Exercise taskbar (search, create exercise) */}
    <Stack>

    <Box 
    bg={TaskBarBG}
    shadow="md" 
    py="4">
      <Flex justify="flex-end">
      <Link to="/createExercise">
            <Button variant="ghost" 
            fontSize="xs"
            py="6"
            mx="4"
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}>
              <Plus size={16}/>

            </Button>
          </Link>
      </Flex>

    </Box>

    {/*Headline */}
    <Heading fontWeight="semibold" fontSize="3xl" m="4">
        Exercises
    </Heading>

    {/**Saved exercises */}
    <Flex direction="column" gap="2" ml="6"> 
        {exercises.map((exercise) => (
            <ExerciseListElement 
            key={exercise._id} 
            exerciseName={exercise.name}
            exerciseDescription={exercise.description}
            />
            ))}
    </Flex>
    </Stack>
    </Box>
  )
}


