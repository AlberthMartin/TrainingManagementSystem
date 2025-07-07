import React from 'react'
import { Table } from "@chakra-ui/react"

export default function ExerciseTable({exercises}) {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Exercise</Table.ColumnHeader>
          <Table.ColumnHeader>Sets</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Reps</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {exercises.map((exercise) => (
          <Table.Row key={exercise.id}>
            <Table.Cell>{exercise.exercise.name}</Table.Cell>
            <Table.Cell>{exercise.sets}</Table.Cell>
            <Table.Cell textAlign="end">{exercise.reps}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
