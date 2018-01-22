import React, { Component } from 'react'
import { findModule } from '../api/module'
import { listQuestions } from '../api/question'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Modal from 'react-modal';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

class AdminQuestions extends Component {
  state = {
    currentModule: null,
    questionList: null,
    modalOpen: false
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

  addQuestion(e) {
    this.setState({modalOpen: true})
  }

  render () {
    const {userId, moduleId} = this.props
    // console.log('userId', userId)
    // console.log('moduleId', moduleId)
    const {questionList, currentModule} = this.state
    const { classes } = this.props;
    console.log('questionList', questionList)
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
              <div className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="name-simple">Name</InputLabel>
                  <Input id="name-simple" value={this.state.name} onChange={this.handleChange} />
                </FormControl>
            </div>
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
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: 10
  }
});

export default withStyles(styles)(AdminQuestions);
