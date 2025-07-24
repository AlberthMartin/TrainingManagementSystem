import React from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  IconButton,
  CloseButton,
  Dialog,
  Portal,
  Box,
  Badge,
  Text,
} from "@chakra-ui/react";

//Add tags for the mucsle groups worked
export default function ExerciseListElement({
  name,
  description,
  primaryMuscleGroup = [],
  secondaryMuscleGroup = [],
}) {
  return (
    <Box>
      <ButtonGroup variant="subtle" attached w="full">
        {/*Avatar icon */}
        <IconButton aria-label="exercise_icon" w="auto">
          <Avatar.Root shape="square">
            <Avatar.Fallback name={name} />
          </Avatar.Root>
        </IconButton>

        {/** Dialog trigger to get info about the exercise */}
        <Dialog.Root
          size="cover"
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <Dialog.Trigger asChild>
            <Button height="10" w="full" justifyContent="start" p="4" pl="6">
              {name}
            </Button>
            {/**The dialog that opens when you click the exercise */}
          </Dialog.Trigger>
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
                  {description}

                  {/* Badges for muscles */}
                  <Box display="flex" gap="2" flexWrap="wrap">
                    {primaryMuscleGroup ?? <Badge colorPalette="blue">{primaryMuscleGroup}</Badge>}
                    {secondaryMuscleGroup ?? <Badge colorPalette="purple" variant="subtle">{secondaryMuscleGroup}</Badge>}
                  </Box>
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </ButtonGroup>
    </Box>
  );
}
