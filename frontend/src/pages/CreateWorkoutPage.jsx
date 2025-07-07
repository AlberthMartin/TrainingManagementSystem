import { VStack, Container, Box, Input, Heading, Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { useColorModeValue } from '../components/ui/color-mode'
import { useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { useExerciseStore } from '@/store/exercise'
import { useNavigate, Link } from "react-router-dom";


//TODO: FIX THIS it is just copyed from another page
export default function CreateWorkoutPage() {
    const inputFieldColor = useColorModeValue("white", "gray.700")
    const textColor = useColorModeValue("black", "white")
    const navigate = useNavigate();

    const fetchExercises = useExerciseStore((state => state.fetchExercises))
    const exercises = useExerciseStore((state) => state.exercises)

    const [searchTerm, setSearchTerm] = useState("");

    const filteredExercises = exercises.filter((exercise) => 
      //So the .toLowerCase function waits until the exercise name is here when you add a new exercise
      typeof exercise.name === 'string' &&
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()))

    useEffect(() => {
        fetchExercises()
    }, [fetchExercises])


    const handleSaveWorkout = async() => {
        const {success, message} = await createProgram(newProgram)
    }

  return (
    <Container maxW="md" px="4" py="4" ml="20">
      <Stack>
        <Heading>
            Create new workout
        </Heading>

        <Box>
            <Stack>
                <Input
                placeholder="Workout name"
                name="name"
                value={newProgram.name}
                onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                bg={inputFieldColor}
                color={textColor}
                />

                

                <Link to="/createWorkout">
                  <Button variant="outline">Add Workout</Button>
                </Link>

                <Button onClick={handleSaveWorkout}>
                    Save program
                </Button>
                <Toaster/>
            </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

