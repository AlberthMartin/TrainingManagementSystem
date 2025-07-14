import React from 'react'
import WorkoutForm from '@/components/WorkoutForm';
import { useParams } from "react-router-dom";

export default function EditWorkoutPage() {
  const {workoutId} = useParams(); 
  return (
    <WorkoutForm workoutId={workoutId} mode="edit"/>
  )
}
