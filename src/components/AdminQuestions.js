import React, { Component } from 'react'
import { findModule } from '../api/module'
import { listQuestions } from '../api/question'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Modal from 'react-modal';

import { addQuestion, listAnswers } from '../api/adminData'

class AdminQuestions extends Component {
  state = {
    currentModule: null,
    questionList: null,
    modalOpen: false,
    answerData: null,
    answerInput: [],
  }

  handleAddAnswer() {
    this.setState({answerInput: this.state.answerInput.concat('answerInput')})
  }

  componentDidMount() {
    findModule(this.props.moduleId)
      .then(currentModule => this.setState({currentModule}))
      .catch(e => console.log(e))
    this.loadQuestions()
    this.loadAnswers()
  }

  loadAnswers() {
    listAnswers()
      .then(answerData => {
        this.setState({answerData: answerData})
      })
      .catch(error => console.log(error))
  }

  loadQuestions(){
    listQuestions(this.props.moduleId)
      .then(questionList => {
        this.setState({questionList})
      })
      .catch(error => console.log(error))
  }

  isAnswered(questionId) {
    const { answerData } = this.state
    let isAnswered = false
    answerData && answerData.forEach(answer => {
      if( answer.question === questionId ) {
        isAnswered = true
      }
    })
    return isAnswered
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

  handleAddNewAnswer(question, answer) {
    // console.log('event', e)
    console.log('question', question._id)
    console.log('answer', answer._id)
  }

  render () {
    const {userId, moduleId} = this.props
    const {questionList, currentModule, answerData} = this.state
    const { classes } = this.props;
    const { answerInput } = this.state

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
              <p><a className="admin-questions-heading-question">Question</a>: {question.content}</p>
                <div className="admin-questions-heading-answers">Answers</div>
              {question.answers.map(answer => {
                return (
                  <ul key={answer._id}>
                    <li>{answer.content}
                    {!this.isAnswered.bind(this, question._id)() &&
                    <Button onClick={this.handleAddNewAnswer.bind(this, question, answer)} className={this.props.classes.button2} raised color="accent">Correct Answer</Button>
                    }
                    </li>
                  </ul>
                )
              })
              }
              <hr className="admin-question-hr"/>
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
  },
  button2: {
    margin: theme.spacing.unit,
  }
});

export default withStyles(styles)(AdminQuestions);
