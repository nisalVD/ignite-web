import React from 'react'
import AdminTable from './AdminTable'
import ModulesTable from './ModulesTable'

function AdminPage (props)
{
    return (

        <div className="admin-page">
            ADMIN CONTROL PANEL
            <div className="admin-page-div">
                <h3> Modules </h3>
                <ModulesTable {...props} />
               <h3> Volunteers </h3>
                <AdminTable {...props} />
                <div className="admin-page-padder"/>
            </div>     
        </div>
        )
    }

export default AdminPage