import React from "react";
import {
  VStack,
  Box,
  Text,
  HStack,
  Container,
  Table,
  Input,
  Button,
} from "@chakra-ui/react";
import { EllipsisVertical } from "lucide-react";
import { useWorkoutStore } from "@/store/workout";

export default function DisplayExerciseInWorkout({
  name,
  sets = [],
  exerciseId,
  onAddSet,
  onRemoveSet,
  onUpdateSetValue,
}) {
  return (
    <VStack>
      <HStack justify="space-between" w="full">
        <Text fontWeight="medium">{name}</Text>
        <Button variant="ghost">
          {" "}
          <EllipsisVertical />{" "}
        </Button>
      </HStack>

      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Set</Table.ColumnHeader>
            <Table.ColumnHeader>Weight</Table.ColumnHeader>
            <Table.ColumnHeader>Reps</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
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
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder="kg"
                  variant="subtle"
                  type="number"
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
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder="reps"
                  variant="subtle"
                  type="number"
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => onRemoveSet(exerciseId, i)}
                >
                  Remove
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Button onClick={() => onAddSet(exerciseId)} variant="outline" w="full">+ Set</Button>
    </VStack>
  );
}
