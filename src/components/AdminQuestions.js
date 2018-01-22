import React, { Component } from 'react'
import { findModule } from '../api/module'
import { listQuestions } from '../api/question'

class AdminQuestions extends Component {
  state = {
    currentModule: null,
    questionList: null
  }

  componentDidMount() {
    findModule(this.props.moduleId)
      .then(currentModule => this.setState({currentModule}))
      .catch(e => console.log(e))

    listQuestions(this.props.moduleId)
      .then(questionList => {
        this.setState({questionList})
      })
      .catch(error => console.log(error))
  }


  render () {
    const {userId, moduleId} = this.props
    // console.log('userId', userId)
    // console.log('moduleId', moduleId)
    const {questionList, currentModule} = this.state
    console.log('questionList', questionList)
    return (
      <div className="admin-questions-div">
        <h1 className="admin-questions-h1">{currentModule && currentModule.name}</h1>
        <h3>Current Questions</h3>
        {questionList && questionList.map(question => {
          return (
            <div key={question._id}>
              <p>{question.content}</p>
            </div>
          )
        })}
      </div>
    )
  }

}

export default AdminQuestions