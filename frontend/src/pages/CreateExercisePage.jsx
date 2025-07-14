import { VStack, Container, Box, Input, Heading, Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { useColorModeValue } from '../components/ui/color-mode'
import { useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { useExerciseStore } from '@/store/exercises'
import { useNavigate } from "react-router-dom";


export default function CreateExercisePage() {
    const inputFieldColor = useColorModeValue("white", "gray.700")
    const textColor = useColorModeValue("black", "white")
    const navigate = useNavigate();

    const [newExercise, setNewExercise] = useState({
        name:"",
        description: "",
    })

    const {createExercise} = useExerciseStore()

    const handleAddExercise = async() => {
        //TODO: Add validation
        const {success, message} = await createExercise(newExercise)

        if(!success) {
            toaster.create({
                title:"Error",
                description: message,
                status: "error",
                type: "error",
                duration: 3000, 
                isClosable: "true"
            })
        }else{
            toaster.create({
                title:"Success",
                description: message,
                status: "success",
                type: "success",
                duration: 1000,  
                isClosable: "true"
            })
            setTimeout(() => {
                navigate("/exercises")
            }, 1000)
            
        }
    }

  return (
    <Container maxW="md" px="4" py="4" ml="20">
      <Stack>
        <Heading>
            Create new exercise
        </Heading>

        <Box>
            <Stack>
                <Input
                placeholder="Exercise name"
                name="name"
                value={newExercise.name}
                onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                bg={inputFieldColor}
                color={textColor}
                />
                <Input
                placeholder="Description"
                name="description"
                value={newExercise.description}
                onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                bg={inputFieldColor}
                color={textColor}
                />

                <Button onClick={handleAddExercise}>
                    Add Exercise
                </Button>
                <Toaster/>
            </Stack>
        </Box>
      </Stack>
    </Container>
  )
}
