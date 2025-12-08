import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Taskbox from './components/taskbox'

function App() {
  return (
    <div className="main">
      <Taskbox/>
      <Navbar/>
    </div>
  )
}

export default App
