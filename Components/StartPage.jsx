import React from "react"
import "./StartPage.css"

export default function StartPage({ startQuiz, setStartQuiz }) {


    return (

        <div className="StartPage_Info">
            <h1>Quizzical</h1>
            <p>a quiz game built in React</p>
            <button className="StartPage_Button" onClick={() => setStartQuiz(!startQuiz)}>Start Quiz</button>
        </div>
    )
}