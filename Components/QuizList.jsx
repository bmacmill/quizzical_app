import React from "react"
import QuizQuestion from "./QuizQuestion"
export default function QuizList({ quiz, questionId, handleSelectChoice, selectedAnswerTrue }) {
    console.log(quiz)
    return (
        <>
            {quiz.map((el) => (
                <QuizQuestion
                    key={el.id}
                    quiz={quiz}
                    question={el.question}
                    choices={el.shuffleChoices}
                    handleSelectChoice={handleSelectChoice} 
                    questionId={el.id}
                    selectedAnswer={el.selectedAnswer}
                    selectedAnswerIndex={el.selectedAnswerIndex}
                    osselectedAnswerTrue={el.isselectedAnswerTrue}
                     />
            ))}
        </>

    )
}