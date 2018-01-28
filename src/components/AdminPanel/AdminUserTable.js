import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableFooter from 'material-ui/Table/TableFooter';
import TableSortLabel from 'material-ui/Table/TableSortLabel';
import Button from 'material-ui/Button';
import Modal from 'react-modal';

import { listModules } from '../../api/module'
import { checkMarking } from '../../api/question'
import { listMarkings, getUserData } from '../../api/adminData'


class AdminUserTable extends Component {

  state = {
    userData: null,
    selectedID: null,
    modalOpen: false,
    currentUserMarkingData: null,
    modules: null,
  }

  componentDidMount(){
    getUserData()
    .then(userData => this.setState({userData}) )
    .catch(error => console.log(error))

    listModules()
    .then(modules => this.setState({modules}))
    .catch(error => console.log(error))

  }

  getID(selectedID){
    this.setState({selectedID})
    this.setState({modalOpen: true})
    console.log(selectedID)
    const {markingData} = this.props
    console.log('markingData', markingData)
    const currentUserMarkingData = markingData && markingData.filter(marking => marking.user === selectedID._id)
    console.log('currentUserMarkingData', currentUserMarkingData)
    this.setState({currentUserMarkingData})
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
  
  render(){
    
    const { classes } = this.props;
    console.log(this.state.selectedID && this.state.selectedID._id)
    const { userData, selectedID, firstName, modules } = this.state;

  return (
    <div>
       <Modal
            isOpen={this.state.modalOpen}
            style={customStyles}
            ariaHideApp={false}
            aria={{
              labelledby: "heading",
              describedby: "full_description"
            }}>
              <div>
                <h1>Volunteer Information</h1>
                Name: {selectedID && selectedID.firstName} {selectedID && selectedID.lastName}
                <br /><br />
                Date of Birth: {selectedID && selectedID.dateOfBirth}
                <br /><br />
                Email: {selectedID && selectedID.email}
                <br /><br />
                Mobile: {selectedID && selectedID.mobileNumber}
                <br /><br />
                Address: {selectedID && selectedID.address}, {selectedID && selectedID.postCode} {selectedID && selectedID.state}
                <h3>Modules Completed:</h3>
                  { modules && modules.map(module => {
                    return (
                      <div>
                      {this.isModuleCompleted.bind(this, module)() && 
                        <p>{module.name}</p>
                      }
                      </div>
                    )
                  })
                  }
              <button className="admin-close-button" onClick={() => this.setState({modalOpen: false})}>X</button>
              </div>
          </Modal>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData && userData.map(n => {
              return (
              <TableRow onClick={this.getID.bind(this, n)} className="row" hover key={n._id}>
                <TableCell>{n.firstName}</TableCell>
                <TableCell >{n.lastName}</TableCell>
                <TableCell >{n.email}</TableCell>
            </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    </div>
  );
 }
}

AdminUserTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    width: '90%',
    marginLeft: '5%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '20%',
    left                       : '20%',
    right                      : '20%',
    bottom                     : '20%',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '5%'
  }
}

export default withStyles(styles)(AdminUserTable);