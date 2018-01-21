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
    currentUserMarkingData: null
  }
  componentDidMount () {
    listModules()
      .then(modules => this.setState({modules}))
      .catch(error => console.log(error))

    checkMarking(this.props.userId) 
      .then(currentUserMarkingData => {
        this.setState({currentUserMarkingData})
      })
  }
   clickModule(e, selectedModule) {
    this.setState({modalOpen: true})
    this.setState({selectedModule})
    const questionUrl = `module/${selectedModule._id}/questions`
    this.setState({questionUrl})
    // const questionUrl = `module/${selectedModule._id}/questions`
    // this.setState({questionUrl})
  }
  isModuleCompleted(module) {
    console.log('module', module)
  }

  render () {
    const {modules, selectedModule, questionUrl, currentUserMarkingData} = this.state
    console.log('currentUser Marking data', currentUserMarkingData)
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








