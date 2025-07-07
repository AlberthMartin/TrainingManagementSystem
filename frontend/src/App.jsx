import { useState } from 'react'


import Navbar from './components/Navbar'

import { Button, ButtonGroup, Box, AbsoluteCenter } from "@chakra-ui/react"
import { Route, Routes, Navigate } from 'react-router-dom'

import ExercisesPage from './pages/ExercisesPage'
import CreateExercisePage from './pages/CreateExercisePage'

import CreateWorkoutPage from './pages/CreateWorkoutPage'


import WorkoutsPage from './pages/WorkoutsPage'

import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import UserProfilePage from './pages/UserProfilePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

import { useAuthStore } from './store/userAuth'
import { useEffect } from "react"

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser){
    return (
      <Box position="relative" h="full" w="full">
        <AbsoluteCenter>
          Loading...
        </AbsoluteCenter>
      </Box>
        
    );
  }
  
  return (
    <>
      {authUser && <Navbar />} {/* Only show navbar when logged in */}

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />}/> 
        <Route path="/home" element={authUser ? <HomePage/> : <Navigate to="/login" />}/>
        <Route path="/profile" element={authUser ? <UserProfilePage/> : <Navigate to="/login" />}/>
        <Route path="/exercises" element={authUser ? <ExercisesPage/> : <Navigate to="/login" />}/>
        <Route path="/createExercise" element={authUser ? <CreateExercisePage/> : <Navigate to="/login" />}/>
       
        <Route path="/createWorkout" element={authUser ? <CreateWorkoutPage/> : <Navigate to="/login" />}/>
        
        <Route path="/workouts" element={authUser ? <WorkoutsPage/> : <Navigate to="/login" />}/>
        
        <Route path="/history" element={authUser ? <HistoryPage/> : <Navigate to="/login" />}/>
        <Route path="/signup" element={authUser ? <Navigate to="/"/> :  <SignUpPage />}/>
        <Route path="/login" element={authUser ? <Navigate to="/"/> :  <LoginPage/>}/>
      </Routes> 
      
    </>
  )
}

export default App
