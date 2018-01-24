import React, { Component } from 'react'

import { findModule } from '../api/module'

class AdminModuleView extends Component {
  state = {
    currentModuleData: []
  }

  componentDidMount() {
    findModule(this.props.selectedModuleId)
      .then((currentModuleData) => {
        this.setState({currentModuleData})
      })
  }

  render () {
    const {currentModuleData} = this.state
    return (
      <div className="admin-module-data-view">
      <h1>Module Page View</h1>
      <br/>
        <h1>{currentModuleData.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: currentModuleData.content}}/>
      </div>
    )
  }
}

export default AdminModuleView