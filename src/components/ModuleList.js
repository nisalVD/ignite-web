import React, { Component } from 'react'
import Module from './Module'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import { listModules } from '../api/module'

class ModuleList extends Component {
  state = {
    modules: null,
    modalOpen: false,
    content: ''
  }
  componentDidMount () {
    listModules()
      .then(modules => this.setState({modules}))
  }
  clickModule(e, moduleId) {
    this.setState({modalOpen: true})
  }
  render () {
    const {modules} = this.state
    console.log(modules && modules)
    return (
        <div className="back-bit">
          { modules && 
            modules.map(module => {
            return <Module moduleId={module._id} clickModule={this.clickModule.bind(this)} key={module._id} name={module.name} />
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
              <h1 id="heading">H1</h1>
              <div id="full_description">
                <p>Description goes here.</p>
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








