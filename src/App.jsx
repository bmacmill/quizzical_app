import React from "react"

import "../Components/StartPage.css"
import QuizQuestion from "../Components/QuizQuestion"
import QuizList from "../Components/QuizList"
import Buttons from "../Components/Buttons"
import he from "he"
import "./App.css"
import StartPage from "../Components/Startpage.jsx"

import { FadeLoader } from "react-spinners";
import { nanoid } from "nanoid";


//the spinner thing css, really just copied docs and put here
//not able to get to work properly
const spinnerCss = {
  margin: '25% auto'
};


export default function App() {

  //setting quiz db data
  const [quiz, setQuiz] = React.useState([])

  //all questions asnswerd -- this should enable the submit button
  const [allAnswered, setAllAnswered] = React.useState(false)

  //setting start page
  const [startQuiz, setStartQuiz] = React.useState(false)

  //score of correct answers
  const [score, setScore] = React.useState(0)

  //display score afer submitted
  const [submit, setSubmit] = React.useState(false)

  //spinner loader--ca't get to work properly removed
  const [loading, setLoading] = React.useState(true)

  //fetch new quesions 
  const [playAgain, setPlayAgain] = React.useState(false)

  // const [quizSubmitted, setQuizSubmitted] = React.useState(false)

  //when should this load on first try... then again on play again button??
  React.useEffect(() => {
    setLoading(true)
    const url = "https://opentdb.com/api.php?amount=5&type=multiple"
    async function getQuiz() {
      const res = await fetch(url)
      const data = await res.json()
      const quizDataArray = await data.results.map((quizQuestion) => {
        return {
          question: he.decode(quizQuestion.question),
          id: nanoid(),
          correct: he.decode(quizQuestion.correct_answer),
          fullChoices: fullArray(quizQuestion.incorrect_answers, quizQuestion.correct_answer),
          selectedAnswer: '',
          isSelected: false,
          selectedAnswerIndex: null
        }
      })
      setQuiz(quizDataArray.map((question) => {
        return {
          ...question,
          shuffleChoices: shuffle(question.fullChoices)
        }
      }))
    }

    const clear = setTimeout(() => {
      getQuiz()
      console.log(quiz)
      setLoading(false)
    }, 1200)

    return () => {
      clearTimeout(clear)
    }
  }, [startQuiz])

  //^^have it set on load, but not sure how to set on play again...

  function fullArray(array1, str) {
    const answers = []
    array1.map((el) => {
      answers.push({
        name: he.decode(el),
        id: nanoid(),
        isCorrect: false,
        isSelected: false
      })
    })
    answers.push({
      name: he.decode(str),
      id: nanoid(),
      isCorrect: true,
      isSelected: false
    })

    return answers
  }


  //simple sort
  //this one is easier to understand, tested and works as welll as fisheryates one
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function handleClick(e, choices, index, id) {
    console.log("clicked")
    const idx = choices.findIndex((choice) => choice.name === e.target.textContent)
    //set selected asnwer on object
    setQuiz(prevQuiz => prevQuiz.map((question, i) => {

      return question.id == id ? {
        ...question,
        isSelected: true,
        selectedIndex: idx,
        selectedAnswer: e.target.textContent,
      } : question
    }))

  }

  //a use effect that checks if all the quesitons have been asnwered, sets that state to true.
  React.useEffect(() => {
    const allSelected = quiz.filter((el) => {
      return el.isSelected === true
    })
    console.log("all", allSelected)
    if (allSelected.length === 5) {
      setAllAnswered(true)
    }
  }, [quiz])


  React.useEffect(() => {
    //map through quiz, see if answer selected is correct?
    //increment score state if it is...
    const ansArray = quiz.filter((question) => {
      return question.selectedAnswer === question.correct ? true : false
    })
    const finalScore = ansArray.length
    setScore(finalScore)
  }, [quiz])


  function checkForScore() {
    setSubmit(true)
  }

  function playAgainBtn() {
    ///call the quiz again???
    console.log('play again...')
    setSubmit(prevSubmit => !prevSubmit)
    setPlayAgain(prevState => !prevState)
    setQuiz([])

  }


  const selectChoice = (choices, quiz, question, i) => {
    console.log(choices)
    console.log("i", i)
    console.log(quiz)
    console.log(question)
    const questIdx = quiz.findIndex((el) => el.question === question)
    console.log(quiz[questIdx].id)
    //set the selected anwer index...
    console.log("answer index", i)
    setQuiz(prevQuiz => prevQuiz.map((el) => {
      if (el.id === quiz[questIdx].id) {
        return {
          ...el,
          isSelected: true,
          selectedQuestionIndex: questIdx,
          selectedAnswer: choices.name,
          selectedAnswerIndex: i,
          isSelectedAnswerTrue: choices.isCorrect
        }
      } else {
        return {
          ...el
        }
      }
    }))

  }

  if (loading) {
    return (
      <FadeLoader
        cssOverride={spinnerCss}
        color="#4D5B9E"
      />
    )
  }

  function buttonClick() {
    console.log("clicked btn....")

  }

  return (
    <>
      <div className="TopBlob"></div>
      {!startQuiz ? <StartPage startQuiz={startQuiz} setStartQuiz={setStartQuiz} />
        :

        <div className="QuizBoard">
          <QuizList
            quiz={quiz}
            choices={quiz.shuffleChoices}
            handleSelectChoice={selectChoice}
            questionId={quiz.id}
            selectedAnswer={quiz.selectedAnswer}
            selectedAnswerIndex={quiz.selectedAnswerIndex}
            isselectedAnswerTrue={quiz.isSelectedAnswerTrue}

          />

          <Buttons handleButtonClick={buttonClick} />


        </div>}

      <div className="BottomBlob"></div>
    </>
  )
}

