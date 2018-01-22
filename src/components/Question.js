import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { 
  listQuestions, 
  addMarking,
  checkMarking
} from '../api/question'


class Question extends Component {
  state = {
    questions: null,
    radioValue: {},
    redirect: false
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

   onClick(e) {
    const {radioValue} = this.state
    const markingData = {}
    markingData.user = this.props.userId
    markingData.quiz = radioValue
    markingData.module = this.props.moduleId
    addMarking(markingData)
      .then(res => console.log(res.data))
      .then(() => {
        checkMarking(this.props.userId)
          .then(data =>{
            console.log(data)
          })
      })
      .catch(error => console.log(error))
  }

  render () {
    const {questions, radioValue, redirect } = this.state
      if (redirect)
      return (<Redirect to={{
          pathname: '/modules',
          state: { finishedQuestions: true }
      }} />)
    return (
      <div className="questions">
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

export default Question