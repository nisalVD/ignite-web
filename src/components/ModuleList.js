import React, { Component } from 'react'
import Module from './Module'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import { listModules } from '../api/module'
import { checkMarking } from '../api/question'

class ModuleList extends Component {
  state = {
    modules: null,
    modalOpen: false,
    content: '',
    selectedModule: '',
    questionUrl: '',
    currentUserMarkingData: null,
    markingNeedsToBeUpdated: false
  }
  componentDidMount () {
    this.loadModules()
    this.checkMarkingLoad()
  }

  // call to load all the modules
  loadModules() {
    listModules()
      .then(modules => this.setState({modules}))
      .catch(error => console.log(error))
  }

  // call to load to all the marking for the current user
  checkMarkingLoad() {
    checkMarking(this.props.userId) 
    .then(currentUserMarkingData => {
      this.setState({currentUserMarkingData})
    })
  }


   clickModule(e, selectedModule) {
    this.setState({modalOpen: true})
    this.setState({selectedModule})
    const questionUrl = `/module/${selectedModule._id}/questions`
    this.setState({questionUrl})
  }
  isModuleCompleted(module) {
    const {currentUserMarkingData} = this.state
    const mappedMarking = currentUserMarkingData && currentUserMarkingData.reduce((acc,next) => {
      if (next.module === module._id){
        acc.push(next)
      }
      return acc
    },[])
    function isEveryTrue(element){
      return element.correct === true
    }
    console.log(mappedMarking)

    let isCorrect = false
    if (!!mappedMarking){
      if(mappedMarking.length > 0) {
        isCorrect = mappedMarking.every(isEveryTrue)
      } else {
        isCorrect = false
      }
    }
    return isCorrect
 }

  componentDidUpdate() {
   this.props.location.state && this.props.location.state.finishedQuestions && 
   checkMarking(this.props.userId) 
   .then(currentUserMarkingData => {
     this.setState({currentUserMarkingData})
   })
   .then(() => {
      this.props.location.state.finishedQuestions = false
   })
  }

  render () {
    const {modules, selectedModule, questionUrl, currentUserMarkingData} = this.state
    return (
        <div className="back-bit">
          { modules && 
            modules.map(module => {
            return <Module isCompleted={this.isModuleCompleted.bind(this, module)()} 
              selectedModule={module} 
              clickModule={this.clickModule.bind(this)} 
              key={module._id} 
              name={module.name} />
            })
          }
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
                <p>{selectedModule.content}</p>
                <Link className="button" to={questionUrl}>Questions</Link>
              </div>
          </Modal>
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

export default ModuleList;








