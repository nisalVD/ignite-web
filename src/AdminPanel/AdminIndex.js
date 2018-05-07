import React, { Component } from 'react'
import AdminUserTable from './AdminUserTable'
import AdminModulesTable from './AdminModulesTable'
import AdminFeedTable from './AdminFeedTable'

import { getModuleData } from '../api/adminData'
import { listFeeds } from '../api/feed'

class AdminIndex extends  Component {
  state = {
    moduleData : null,
    feedData : null
  }

  componentDidMount() {
    getModuleData()
    .then(moduleData => this.setState({moduleData}));

    listFeeds()
    .then(feedData => this.setState({feedData}));
  }

  render() {
    const {moduleData} = this.state
    const {feedData} = this.state

    return (
      <div className="admin-page">
        ADMIN CONTROL PANEL
        <div className="admin-page-div">
            <h3> Modules </h3>
            <AdminModulesTable {...this.props} moduleData={moduleData} />
            <h3>Feed Posts</h3>
            <AdminFeedTable {...this.props} feedData={feedData}/>
            <h3>Volunteers</h3>
            <AdminUserTable {...this.props} moduleData={moduleData} />
            <div className="admin-page-padder"/>
        </div>     
      </div>
    )
  }
}

export default AdminIndex