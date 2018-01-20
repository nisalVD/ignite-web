import React, { Component } from 'react'
import Module from './Module'

import { listModules } from '../api/module'

class ModuleList extends Component {
  render () {
    return (
        <div className="back-bit">
          <Module name="Code of Conduct"/>
          <Module name="Module 2"/>
          <Module name="Module 3"/>          
        </div>
    )
  }
}

export default ModuleList;








