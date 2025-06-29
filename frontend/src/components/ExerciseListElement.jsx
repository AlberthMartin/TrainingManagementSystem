import React from 'react'
import { Avatar, Button, ButtonGroup, IconButton, CloseButton, Dialog, Portal } from "@chakra-ui/react"

//Add tags for the mucsle groups worked
export default function ExerciseListElement({exerciseName, exerciseDescription}) {
  return (

      <ButtonGroup variant="outline" attached w="full">
        {/*Avatar icon */}
        <IconButton aria-label="Pull up icon" w="auto">
            <Avatar.Root shape="square" >
                <Avatar.Fallback name={exerciseName} />
            </Avatar.Root>
        </IconButton>

            {/** Dialog trigger to get info about the exercise */}
            <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
              <Dialog.Trigger asChild>
            <Button height="10" w="full" justifyContent="start" p="4" pl="6">
                {exerciseName}
            </Button>
            {/**The dialog that opens when you click the exercise */}
            </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>{exerciseName}</Dialog.Title>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Dialog.CloseTrigger>
                    </Dialog.Header>
                  <Dialog.Body>
                    {exerciseDescription}
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </ButtonGroup>
      
  )
}
