import React from "react"
import "./Buttons.css"

export default function Buttons({ handleButtonClick, canSubmit }) {
    
    return (


        <button className="Btn" onClick={handleButtonClick} disabled={!canSubmit}>Check Score</button>

    )
}
