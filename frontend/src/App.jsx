import { useState } from 'react'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Route, Routes } from 'react-router-dom'
import ExercisesPage from './pages/ExercisesPage'

function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ExercisesPage/>}/> 
        <Route path="/exercises" element={<ExercisesPage/>}/>
      </Routes>
    </>
  )
}

export default App
