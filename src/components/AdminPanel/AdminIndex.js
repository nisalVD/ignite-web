import React, { Component } from 'react'
import UserTable from './UserTable'
import ModulesTable from './ModulesTable'
import { getModuleData } from '../../api/adminData'

class AdminIndex extends  Component {
  state = {
    moduleData : null
  }

  componentDidMount() {
    getModuleData()
    .then(moduleData => this.setState({moduleData}))
  }

  render() {
    const {moduleData} = this.state

    return (
      <div className="admin-page">
        ADMIN CONTROL PANEL
        <div className="admin-page-div">
            <h3> Modules </h3>
            <ModulesTable {...this.props} moduleData={moduleData} />
            <h3>Volunteers</h3>
            <UserTable {...this.props} moduleData={moduleData} />
            <div className="admin-page-padder"/>
        </div>     
      </div>
    )
  }
}

export default AdminIndex