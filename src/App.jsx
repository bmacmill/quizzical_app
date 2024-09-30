import { useState } from 'react'

import "../Components/StartPage.css"
import "./App.css"
import StartPage from "../Components/Startpage.jsx"

function App() {

  console.log("hello")

  return (
    <>
      <div className="TopBlob"></div>
        <StartPage />
      <div className="BottomBlob"></div>
    </>
  )
}

export default App
