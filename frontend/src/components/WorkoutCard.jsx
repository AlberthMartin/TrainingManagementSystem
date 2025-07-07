import { Avatar, Button, Card, For, Stack } from "@chakra-ui/react"
import { Text, Flex, Box, ButtonGroup, IconButton, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import ExerciseTable from "./ExerciseTable"
import React from 'react'

export default function WorkoutCard({name, exercises}) {
  return (
    <Box ml="10">
    <Card.Root width="320px" variant="outline">
        <Card.Body gap="2">
        
        <Card.Title mb="2">{name}</Card.Title>
        <Card.Description>
        <Flex gap="1"> 
        {exercises.map((exercise, i) => (
            <Text key={i}>
                {exercise.exercise.name}
                {i === exercises.length -1 ? "." : ","}
             </Text>
            
            
        ))}
        </Flex>

        </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
            <Button variant="outline">Edit</Button>
                
            <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
                <Dialog.Trigger asChild>
                <Button>Open</Button>
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
                            <ExerciseTable exercises={exercises}/>
                        </Flex>
                    </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

                </Card.Footer>
            </Card.Root>
        
    
        
                
            </Box>
  )
}
