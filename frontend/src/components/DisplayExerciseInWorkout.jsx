import React from "react";
import {
  VStack,
  Text,
  HStack,
  Table,
  Input,
  Button,
  Menu,
  Portal,
  Checkbox,
} from "@chakra-ui/react";
import { EllipsisVertical, X } from "lucide-react";

export default function DisplayExerciseInWorkout({
  name,
  sets = [],
  exerciseId,
  onAddSet,
  onRemoveSet,
  onUpdateSetValue,
  onRemoveExercise, //handleRemoveExercise(exerciseId)
  mode, //create, edit, log
}) {
  return (
    <VStack>
      <HStack justify="space-between" w="full">
        <Text fontWeight="medium">{name}</Text>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="ghost" size="sm">
              {" "}
              <EllipsisVertical />{" "}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="delete"
                  color="fg.error"
                  _hover={{ bg: "bg.error", color: "fg.error" }}
                  onClick={() => onRemoveExercise(exerciseId)}
                  colorScheme="red"
                >
                  Delete...
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Set</Table.ColumnHeader>
            <Table.ColumnHeader>Weight</Table.ColumnHeader>
            <Table.ColumnHeader>Reps</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
            {mode === "log" ? (
              <Table.ColumnHeader>Completed</Table.ColumnHeader>
            ) : (
              ""
            )}
          </Table.Row>
        </Table.Header>
        {/*The sets of the Exercise */}
        <Table.Body>
          {sets.map((set, i) => (
            <Table.Row key={i}>
              <Table.Cell>{i + 1}</Table.Cell>
              <Table.Cell>
                <Input
                  value={set.weight}
                  onChange={(e) =>
                    onUpdateSetValue(
                      exerciseId,
                      i,
                      "weight",
                      e.target.value === ""
                        ? ""
                        : Math.max(0, Number(e.target.value))
                    )
                  }
                  placeholder="kg"
                  variant="subtle"
                  type="number"
                  min="0"
                />
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Input
                  value={set.reps}
                  onChange={(e) =>
                    onUpdateSetValue(
                      exerciseId,
                      i,
                      "reps",
                      e.target.value === ""
                        ? ""
                        : Math.max(0, Number(e.target.value))
                    )
                  }
                  placeholder="reps"
                  variant="subtle"
                  type="number"
                  min="0"
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => onRemoveSet(exerciseId, i)}
                  colorPalette="red"
                >
                  <X />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Button onClick={() => onAddSet(exerciseId)} variant="outline" w="full">
        + Set
      </Button>
    </VStack>
  );
}
