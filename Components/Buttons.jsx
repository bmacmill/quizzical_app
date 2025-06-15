import React from "react"
import "./Buttons.css"

export default function Buttons({ handleButtonClick, canSubmit, quizSubmitted, score }) {
    
    return (

        
            <div className="Btn_Container">
                {quizSubmitted && <p>You scored {score} out of 5</p> }
            <button className="Btn" 
                    onClick={handleButtonClick} 
                    disabled={!canSubmit}>
                        
                        {!quizSubmitted ? "Check Score" : "Play again"}
                        
            </button>
            </div>
        
    )
}
