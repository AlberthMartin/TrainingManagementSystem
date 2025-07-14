import { useState } from 'react'


import Navbar from './components/Navbar'

import { Button, ButtonGroup, Box, AbsoluteCenter,Spinner, Flex  } from "@chakra-ui/react"
import { Route, Routes, Navigate } from 'react-router-dom'
import ActiveWorkoutBottomBar from './components/ActiveWorkoutBottomBar'
import ExercisesPage from './pages/ExercisesPage'

import CreateExercisePage from './pages/CreateExercisePage'

import WorkoutsPage from './pages/WorkoutsPage'
import ActiveWorkout from './pages/ActiveWorkout'

import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import UserProfilePage from './pages/UserProfilePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

import { useAuthStore } from './store/userAuth'
import { useWorkoutStore } from './store/workout'
import { useEffect } from "react"
import CreateWorkoutPage from './pages/CreateWorkoutPage'
import EditWorkoutPage from './pages/EditWorkoutPage'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const activeWorkout = useWorkoutStore((state) => state.activeWorkout);
  const getElapsedSeconds = useWorkoutStore((s) => s.getElapsedSeconds);

  const [elapsed, setElapsed] = useState(getElapsedSeconds());

  useEffect(() => {
    if (!activeWorkout) return;

    const interval = setInterval(() => {
      setElapsed(getElapsedSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeWorkout, getElapsedSeconds]);


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser){
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl"/>
      </Flex>
        
    );
  }
  
  return (
    <>
      {authUser && <Navbar />} {/* Only show navbar when logged in */}

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />}/> 
        <Route path="/home" element={authUser ? <HomePage/> : <Navigate to="/login" />}/>
        <Route path="/profile" element={authUser ? <UserProfilePage/> : <Navigate to="/login" />}/>
        <Route path="/history" element={authUser ? <HistoryPage/> : <Navigate to="/login" />}/>
        <Route path="/signup" element={authUser ? <Navigate to="/"/> :  <SignUpPage />}/>
        <Route path="/login" element={authUser ? <Navigate to="/"/> :  <LoginPage/>}/>
        
        <Route path="/exercises" element={authUser ? <ExercisesPage/> : <Navigate to="/login" />}/>
        <Route path="/createExercise" element={authUser ? <CreateExercisePage/> : <Navigate to="/login" />}/>
       
        <Route path="/workouts" element={authUser ? <WorkoutsPage/> : <Navigate to="/login" />}/>
        {/*TODO: REMEMBER TO ADD AUTHENTICATION */}
        <Route path="/createWorkout" element={authUser ? <CreateWorkoutPage/> : <Navigate to="/login" />}/>
        <Route path="/editWorkout/:workoutId" element={authUser ? <EditWorkoutPage/> : <Navigate to="/login" />}/>
        <Route path="/activeWorkout/:workoutId" element={authUser ? <ActiveWorkout/> : <Navigate to="/login" />}/>
      </Routes> 

      {activeWorkout && <ActiveWorkoutBottomBar seconds={elapsed}/>}
      
    </>
  )
}

export default App
