import React, { Component } from 'react'
import { findModule } from '../api/module'
import { listQuestions } from '../api/question'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Modal from 'react-modal';

import {addQuestion} from '../api/adminData'

class AdminQuestions extends Component {
  state = {
    currentModule: null,
    questionList: null,
    modalOpen: false,
    answerInput: []
  }

  handleAddAnswer() {
    this.setState({answerInput: this.state.answerInput.concat('answerInput')})
  }

  componentDidMount() {
    findModule(this.props.moduleId)
      .then(currentModule => this.setState({currentModule}))
      .catch(e => console.log(e))

    this.loadQuestions()
  }

  loadQuestions(){

    listQuestions(this.props.moduleId)
      .then(questionList => {
        this.setState({questionList})
      })
      .catch(error => console.log(error))
  }

  questionFormSubmit(e) {
    e.preventDefault()
    const form = e.target
    const elements = form.elements
    const {answerInput} = this.state

    const question = elements.question.value
    const reducedAnswerInput = answerInput.reduce((acc, next, idx) => {
      const parsedAnswer = elements[`${next}${idx}`].value
      let parsedAnswerObj = {}
      parsedAnswerObj.content = parsedAnswer
      acc.push(parsedAnswerObj)
      return acc
    },[])
    console.log('reduced Answer Input', reducedAnswerInput)

    let newQuestionObj = {}
    newQuestionObj.module = this.props.moduleId
    newQuestionObj.content = question
    newQuestionObj.answers = reducedAnswerInput
    newQuestionObj.post

    addQuestion(newQuestionObj)
    .then(res => {
      this.setState({modalOpen: false})
      this.loadQuestions()
    })
    .catch(error => {
      console.log(error)
    })

  }
  addQuestion(e) {
    this.setState({modalOpen: true})
  }

  deleteAnswerInput(e, answer, idx) {
    console.log('deleted soon')
    const {answerInput} = this.state
    answerInput.splice(idx, 1)
    this.setState({answerInput})
  }

  render () {
    const {userId, moduleId} = this.props
    // console.log('userId', userId)
    // console.log('moduleId', moduleId)
    const {questionList, currentModule} = this.state
    const { classes } = this.props;
    const { answerInput } = this.state
    console.log('answer Input', answerInput)

    return (
      <div className="admin-questions-div">
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
              <h3>Add New Question</h3>
                <form onSubmit={this.questionFormSubmit.bind(this)}>
                  <label className="mb-3">Question Name</label>
                  <br/>
                  <input className="aq-input-field" type="text-area" name="question"/>
                  <br/><br />
                  <strong>Answers</strong>
                  <br/>
                  {
                    answerInput.map((answer, idx) => {
                      return (
                        <div key={idx}>
                          <input className="aq-input-field"
                            type="text-input" 
                            name={`${answer}${idx}`} 
                            placeholder={`Answer #${idx}`}
                            />
                          <Button onClick={this.deleteAnswerInput.bind(this, answer, idx)} raised color="accent"
                           className={this.props.classes.button}>Remove</Button>
                        </div>
                      )
                    })
                  }
                  <Button onClick={this.handleAddAnswer.bind(this)} raised color="primary" className={this.props.classes.button}>Add Answer</Button>
                  <Button type="submit" raised color="primary" className={this.props.classes.button}>Submit</Button>
                </form>
            </div>
          </Modal>
        <h1 className="admin-questions-h1">{currentModule && currentModule.name}</h1>
        <div className="aq-button-right">
          <Button onClick={this.addQuestion.bind(this)} raised color="primary" className={this.props.classes.button}>Add Question</Button>
        </div>
        <h3>Current Questions</h3>
        {questionList && questionList.map(question => {
          return (
            <div key={question._id}>
              <p>{question.content}</p>
              {question.answers.map(answer => {
                return (
                  <ul key={answer._id}>
                    <li>{answer.content}</li>
                  </ul>
                )
              })
              }
            </div>
          )
        })}
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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

export default withStyles(styles)(AdminQuestions);
