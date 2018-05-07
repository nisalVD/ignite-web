import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableFooter from 'material-ui/Table/TableFooter';
import TableSortLabel from 'material-ui/Table/TableSortLabel';
import Button from 'material-ui/Button';
import Modal from 'react-modal';
import './AdminUserTable.css'
import Dialog, {DialogContent, DialogContentText, DialogTitle, DialogActions} from 'material-ui/Dialog';

import { listModules } from '../api/module'
import { checkMarking } from '../api/question'
import { listMarkings, getUserData, deleteUser } from '../api/adminData'


class AdminUserTable extends Component {

  state = {
    userData: null,
    selectedID: null,
    modalOpen: false,
    currentUserMarkingData: null,
    markingData: null,
    filteredUserData: null,
    dialogOpen: false,
  }

  componentDidMount(){
    getUserData()
    .then(userData => {
      this.setState({userData})
      return userData
    })
    .then((filteredUserData) => this.setState({filteredUserData}))
    .catch(error => console.log(error))

    listMarkings()
    .then(markingData => this.setState({markingData}))
    .catch(error => console.log(error))
  }

  getID(selectedID){
    this.setState({selectedID})
    this.setState({modalOpen: true})
    const {markingData} = this.state
    const currentUserMarkingData = markingData && markingData.filter(marking => marking.user === selectedID._id)
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

 handleSearch = (event) => {
   const { userData } = this.state
   const filteredUserData = userData.filter(user => {
     return user.firstName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
   })
   this.setState({filteredUserData})
 }

  parseDate = (date) => {
    const parsedDateArray = date.split('T')[0].split('-')
    const parsedDate = `${parsedDateArray[2]}/${parsedDateArray[1]}/${parsedDateArray[0]}`
    return parsedDate
  }

  handleDeleteUserPrompt = (isDeleteUser) => {
    const id = this.state.selectedID._id
    if (isDeleteUser) {
      // if clicked to delete user
      deleteUser(id)
        .then(data => {
          const {userData} = this.state

          // remove the delted user Data from current state
          const filteredUserData = userData.filter(user => {
            return user._id !== data._id
          })
          this.setState({filteredUserData})

          this.setState({dialogOpen: false})
          this.setState({modalOpen: false})
        })
        .catch(error => {
          console.log('cannot delete admin')
        })
    } else {
      this.setState({dialogOpen: false})
    }

  }

  render(){
    const { classes } = this.props;
    const { userData, selectedID, firstName, filteredUserData, dialogOpen } = this.state
    console.log('userData', userData)
    const { moduleData } = this.props

  return (
    <div>
        <Dialog
          open={dialogOpen}
          onClose={() => this.setState({dialogOpen: false})}
        >
            <DialogTitle>
              Delete User
            </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure? this is will permanently Delete this user, this action is unreversable
          </DialogContentText>
          </DialogContent>
            <br/>
            <DialogActions>
              <Button
                onClick={this.handleDeleteUserPrompt.bind(this, false)}
                color="primary"
              >
                No
              </Button>
              <Button
                onClick={this.handleDeleteUserPrompt.bind(this, true)}
                color="primary"
              >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

       <Modal
            isOpen={this.state.modalOpen}
            style={customStyles}
            ariaHideApp={false}
            aria={{
              labelledby: "heading",
              describedby: "full_description"
            }}>
              <div>
                <div className="admin-user-table-button-container">
                  <Button
                    onClick={() => this.setState({dialogOpen: true})}
                    raised
                    color="primary"
                  >
                    Delete User
                  </Button>
                </div>
                <h1>Volunteer Information</h1>
                Name: {selectedID && selectedID.firstName} {selectedID && selectedID.lastName}
                <br /><br />
                Date of Birth: {selectedID && this.parseDate(selectedID.dateOfBirth)}
                <br /><br />
                Email: {selectedID && selectedID.email}
                <br /><br />
                Mobile: {selectedID && selectedID.mobileNumber}
                <br /><br />
                Address: {selectedID && selectedID.address}, {selectedID && selectedID.postCode} {selectedID && selectedID.state}
                <h3>Modules Completed:</h3>
                  { moduleData && moduleData.map(module => {
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
            <TableCell>Search{' '}
              <input
                class="admin-search-input"
                type="text"
                onChange={this.handleSearch}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUserData && filteredUserData.map(n => {
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
