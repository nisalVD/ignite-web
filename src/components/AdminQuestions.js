import React, { Component } from 'react'
import {listQuestions} from '../api/question'

class AdminQuestions extends Component {
  state = {
    currentModule: null,
    questionList: null
  }

  componentDidMount() {
    listQuestions(this.props.moduleId)
      .then(questionList => {
        this.setState({questionList})
      })
      .catch(error => console.log(error))
  }


  render () {
    const {userId, moduleId} = this.props
    console.log('userId', userId)
    console.log('moduleId', moduleId)
    const {questionList} = this.state
    return (
      <div>
      </div>
    )
  }

}

export default AdminQuestions