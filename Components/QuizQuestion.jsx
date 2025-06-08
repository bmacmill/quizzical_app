import React from "react"

export default function QuizQuestion({ quizSubmitted, isSelectedAnswerTrue, question, correct, choices, handleSelectChoice, quiz, selectedAnswer, selectedAnswerIndex }) {
    // console.log(quiz[0])
   
    //console.log("selans", choices[selectedAnswerIndex].isCorrect)
    //console.log("choices", choices)
    //console.log("hus", correct)
    // console.log("q", quizSubmitted)
    // console.log("ans true", "isSelectedAnswerTrue", isSelectedAnswerTrue)
    //quizSubmitted
    // let isQuizSubmitted = false
    //console.log("qs", isSubmitted)
    // console.log("aa", quizSubmitted)
    // let bgColor = "#D6DBF5";
    // if (true && quiz.length > 1) {
    //     bgColor = "red"
    // }

    // if (!true && quiz.length > 4) {
    //     bgColor = "#D6DBF5"

    // }    "#F8BCBC" - red
    //       "#94D7A2" - green
    ///others have some kind of opacity deal 
    //selectd have no border or border is color of button
    //opacity on bottom border...


    ///make li's buttons so you can disable

    //fix score and play again button
    return (
        <div className="Question">

            <p>{question}</p>
            <ul>
                {choices.map((choice, i) =>
               
                    <li
                        style={!quizSubmitted && selectedAnswerIndex === i
                            ? { backgroundColor: "#D6DBF5" }    
                            : quizSubmitted && choice.isCorrect
                                ? { backgroundColor: "#94D7A2", opacity: 0.9 }
                                : quizSubmitted && isSelectedAnswerTrue === false && selectedAnswerIndex === i
                                    ? { backgroundColor: "#F8BCBC", opacity: 0.9 }
                                    //: isQuizSubmitted && i === selectedAnswerIndex
                                    //? {backgroundColor: "puple"}
                                    : null}
                        key={choice.id} onClick={() => handleSelectChoice(choice, quiz, question, i)}>
                        {choice.name}</li>
                )
                }


                {/* </ul><li style={props.selectedIndex === i ? { backgroundColor: bgStyleColor } : null}
                        key={choice.id}
                        onClick={!props.isQuizSubmitted ? props.handleClick : null}>
                        {choice.name}</li>)} */}

            </ul>

        </div >
    )
}

// let num = 1;
// let word =
//   num === 1
//     ? 'one'
//     : num === 2
//     ? 'two'
//     : num === 3
//     ? 'three'
//     : 'unknown';