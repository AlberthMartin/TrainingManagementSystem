import { Avatar, Button, Card, For, Stack } from "@chakra-ui/react";
import {
  Text,
  Flex,
  Box,
  ButtonGroup,
  IconButton,
  CloseButton,
  Dialog,
  Portal,
  Menu
} from "@chakra-ui/react";
import ExerciseTable from "./ExerciseTable";
import React from "react";
import { Link } from "react-router-dom";

import { useColorModeValue } from "../components/ui/color-mode";
import { EllipsisVertical } from "lucide-react";

export default function WorkoutCard({ name, exercises = [], id }) {
  const secondaryTextColor = useColorModeValue("gray.700", "gray.400");
  return (
    <Box position="relative">
      <Card.Root width="320px" height="200px" variant="outline">
        {/*Menu  */}
        <Box position="absolute" top="2" right="2" zIndex="1" p="2">
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisVertical size="22" />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="rename">Edit</Menu.Item>
                  <Menu.Item
                    value="delete"
                    color="fg.error"
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                  >
                    Delete...
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Box>

        <Card.Body gap="2">
          <Card.Title mb="2">{name} </Card.Title>
          <Text fontSize="sm" color={secondaryTextColor}>
            {exercises?.length > 0
              ? exercises.map((e) => e.exercise?.name).join(", ") + "."
              : "No exercises added"}
          </Text>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Link to={`/editWorkout/${id}`}>
            <Button variant="outline">Edit</Button>
          </Link>

          <Dialog.Root
            size="cover"
            placement="center"
            motionPreset="slide-in-bottom"
          >
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
                      {exercises?.length > 0 ? (
                        <ExerciseTable exercises={exercises} />
                      ) : (
                        "No exercises"
                      )}
                    </Flex>
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}
