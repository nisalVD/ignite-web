import React, { Component } from 'react'
import AdminUserTable from './AdminUserTable'
import AdminModulesTable from './AdminModulesTable'
import AdminFeedTable from './AdminFeedTable'

import { getModuleData } from '../api/adminData'

class AdminIndex extends  Component {
  state = {
    moduleData : null,
  }

  componentDidMount() {
    getModuleData()
    .then(moduleData => this.setState({moduleData}));
  }

  removeModuleFromTable = (id) => {
    const {moduleData} = this.state
    const removedModuleData = moduleData.filter(module => {
      return module._id !== id
    })
    this.setState({moduleData: removedModuleData})
  }

  render() {
    const {moduleData} = this.state

    return (
      <div className="admin-page">
        ADMIN CONTROL PANEL
        <div className="admin-page-div">
            <h3> Modules </h3>
            <AdminModulesTable {...this.props} moduleData={moduleData} removeModuleFromTable={this.removeModuleFromTable} />
            <h3>Feed Posts</h3>
            <AdminFeedTable {...this.props} />
            <h3>Volunteers</h3>
            <AdminUserTable {...this.props} moduleData={moduleData} />
            <div className="admin-page-padder"/>
        </div>
      </div>
    )
  }
}

export default AdminIndex
