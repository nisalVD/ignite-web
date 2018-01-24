import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Modal from 'react-modal'

import { 
  listQuestions, 
  addMarking,
  checkMarking,
  checkIncorrectMarking
} from '../api/question'


class Question extends Component {
  state = {
    questions: null,
    radioValue: {},
    redirect: false,
    modalOpen: false,
    wrongAnswers: null
  }

  componentDidMount(){
    listQuestions(this.props.moduleId)
      .then(questions => this.setState({questions}))
  }

  onChange(e) {
    let answerId = e.target.value
    let questionId = e.target.name
    const completedObject = {}
    completedObject[questionId] = answerId
    let currentStateRadio = {}
    if (this.state.radioValue){
      currentStateRadio = this.state.radioValue
    }
    const newObj = Object.assign(currentStateRadio, completedObject)
    this.setState({radioValue: newObj})
  }

   async onClick(e) {
    const {radioValue} = this.state
    const markingData = {}
    markingData.user = this.props.userId
    markingData.quiz = radioValue
    markingData.module = this.props.moduleId
    try {
      await addMarking(markingData)
      } catch(e) {
        console.log(e)
    }
    const currentUserMarking = await checkIncorrectMarking(this.props.userId)
    console.log(currentUserMarking)
    const wrongAnswers = currentUserMarking.reduce((acc, next) => {
      let answerContent
      next.question.answers.forEach(answer => {
        if(answer._id === next.answer){
          answerContent = answer.content
        }
      })
      let parsedObj = {}
      parsedObj.question = next.question.content
      parsedObj.answer = answerContent
      acc.push(parsedObj)
  
      return acc
    },[])
    if(wrongAnswers.length > 0){
      this.setState({modalOpen: true})
      this.setState({wrongAnswers})
    }
    else {
      this.setState({redirect: true})
    }
  }

  render () {
    const {questions, radioValue, redirect, wrongAnswers } = this.state
      if (redirect)
      return (<Redirect to={{
          pathname: '/modules',
          state: { finishedQuestions: true }
      }} />)
    return (
      <div className="questions">
            <Modal
            isOpen={this.state.modalOpen}
            style={customStyles}
            ariaHideApp={false}
            aria={{
              labelledby: "heading",
              describedby: "full_description"
            }}>
              <button onClick={() => this.setState({modalOpen: false})}>Close</button>
              <div>
                <h1>You got these wrong</h1>
                { wrongAnswers && wrongAnswers.map(wrongAnswer => {
                  return (
                    <div key={wrongAnswer._id}>
                      <p><strong>Question</strong>: {wrongAnswer.question}</p>
                      <p>Your Answer: {wrongAnswer.answer}</p>
                    </div>
                  )
                })}
              </div>
          </Modal>
        {!!questions &&
          questions.map(question => {
            return (
              <div key={question._id}>
                {question.content}
                {question.answers.map(answer => {
                  return (
                    <div key={answer._id}>
                      {answer.content}
                      {radioValue &&
                        <input
                          type="radio"
                          checked={radioValue[question._id] === answer._id}
                          value={answer._id}
                          name={question._id}
                          onChange={this.onChange.bind(this)}
                        />
                      }
                    </div>
                  )
                })}
              </div>
            )
          })
        }
        <button onClick={this.onClick.bind(this)}>Submit</button>
      </div>
    )
  }
}

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 20,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '80px',
    left                       : '80px',
    right                      : '80px',
    bottom                     : '80px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
}

export default Question