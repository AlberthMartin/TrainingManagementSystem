import React from 'react'
import { Table } from "@chakra-ui/react"

export default function ExerciseTable({exercises}) {
  return (
    <Table.Root size="sm" variant="simple" >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader border="1px solid">Exercises</Table.ColumnHeader>
          <Table.ColumnHeader border="1px solid">Set</Table.ColumnHeader>
          <Table.ColumnHeader border="1px solid">Reps</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center" border="1px solid">Total Sets</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {exercises.map((exercise, exerciseIndex) => 
          exercise.sets.map((set, setIndex) => (
            <Table.Row key={`${exerciseIndex}-${setIndex}`}>
              {setIndex === 0 && (
                <Table.Cell rowSpan={exercise.sets.length} borderBottom="1px solid" borderX="1px solid">
                  {exercise.exercise.name}
                </Table.Cell>
              )}
              <Table.Cell borderBottom="1px solid">
              {`Set ${setIndex + 1}`}
              </Table.Cell>
              <Table.Cell borderBottom="1px solid">
              {set.reps}
              </Table.Cell>
              {setIndex === 0 && (
                <Table.Cell textAlign="center" rowSpan={exercise.sets.length} borderBottom="1px solid" borderX="1px solid">
                  {exercise.sets.length}
                </Table.Cell>
              )}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}
