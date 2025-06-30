import { useState } from 'react'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom'
import ExercisesPage from './pages/ExercisesPage'
import CreateExercisePage from './pages/CreateExercisePage'
import ProgramsPage from './pages/ProgramsPage'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import UserProfilePage from './pages/UserProfilePage'

function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/> 
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile" element={<UserProfilePage/>}/>
        <Route path="/exercises" element={<ExercisesPage/>}/>
        <Route path="/createExercise" element={<CreateExercisePage/>}/>
        <Route path="/programs" element={<ProgramsPage/>}/>
        <Route path="/history" element={<HistoryPage/>}/>

      </Routes> 
    </>
  )
}

export default App
