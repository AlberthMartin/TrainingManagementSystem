//Exercises overview page, lists all the saved exercises in the appliaction
//Ability to edit them and delete them
import React, { useEffect } from 'react'
import ExerciseListElement from '@/components/ExerciseListElement'
import { Flex, Box, Heading, Avatar, Text, HStack, Container, Button, ButtonGroup, IconButton } from "@chakra-ui/react"
import { useExerciseStore } from '@/store/exercise'



export default function ExercisesPage() {

    const fetchExercises = useExerciseStore((state => state.fetchExercises))
    const exercises = useExerciseStore((state) => state.exercises)

    useEffect(() => {
        fetchExercises()
    }, [fetchExercises])

  return (
    <Box overflowX="hidden" ml="20"> 
    {/*Exercise taskbar (search, create exercise) */}
    {/*Headline */}
    <Heading fontWeight="semibold" fontSize="3xl" m="4">
        Exercises
    </Heading>

    {/**Saved exercises */}
    <Flex direction="column" gap="1" ml="4"> 
        {exercises.map((exercise) => (
            <ExerciseListElement 
            key={exercise._id} 
            exerciseName={exercise.name}
            exerciseDescription={exercise.description}
            />
            ))}
    </Flex>
    </Box>
  )
}


