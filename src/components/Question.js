import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { 
  listQuestions, 
  addMarking 
} from '../api/question'


class Question extends Component {
  state = {
    questions: null,
    radioValue: {},
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
    console.log(markingData)
    addMarking(markingData)
      .then(res => console.log(res.data))
      .then(
        this.props.history.push('/modules')
      )
      .catch(error => console.log(error.message))
  }

  render () {
    const {questions, radioValue } = this.state
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

export default withRouter(Question)