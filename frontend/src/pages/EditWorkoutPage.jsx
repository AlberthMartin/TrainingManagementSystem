import React from 'react'
import WorkoutForm from '@/components/WorkoutForm';
import { useParams } from "react-router-dom";

export default function EditWorkoutPage() {
  const {workoutId} = useParams(); //if new === null, if going to be edited then workoutId is somethin
  return (
    <WorkoutForm workoutId={workoutId}/>
  )
}
