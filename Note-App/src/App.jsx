import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import AddNotes from './Components/AddNotes'
import AllNotes from './Components/AllNotes'
import { ToastContainer } from 'react-toastify'


function App() {


  return (

    <div>
      <Header/>
      <AddNotes/>
      <AllNotes/>
    </div>

  )
}

export default App
