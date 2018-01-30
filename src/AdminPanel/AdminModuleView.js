import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button';
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
        <div className="aq-button-right">
        <Button raised color="primary" component={Link} to={`/admin/module/${currentModuleData._id}/questions`}>
          Add Questions
        </Button>
        </div>
        <h1>{currentModuleData.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: currentModuleData.content}}/>
      </div>
    )
  }
}

export default AdminModuleView