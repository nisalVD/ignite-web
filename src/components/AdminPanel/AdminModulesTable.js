import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableFooter from 'material-ui/Table/TableFooter';
import TableSortLabel from 'material-ui/Table/TableSortLabel';
import Button from 'material-ui/Button';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import { deleteModuleData, getQuestionData } from '../../api/adminData';

class AdminModulesTable extends Component {

  state = {
    selectedID: null,
    modalOpen: false,
    questionData: 0,
}

  deleteModuleContent(){
    deleteModuleData(this.state.selectedID._id)
    .then(( ) => console.log("deleted"))
    .then(() => {
      const {selectedID} = this.state
      const {moduleData} = this.props

      const mappedModule = moduleData.reduce((acc, next) => {
          if (next._id !== selectedID._id) {
            acc.push(next)
          }
          return acc
        },[])
        this.setState({moduleData: mappedModule}) 
        this.setState({modalOpen: false})       
    }) 
  }

  handleCloseModal () {
    this.setState({ modalOpen: false });
  }

  questionData(n){
    const questionData = this.state.questionData
    const mappedQuestion = questionData && questionData.filter(questionData => questionData.module === n._id )
    return mappedQuestion.length
  }

  getID(selectedID){
    this.setState({selectedID})
    this.setState({modalOpen: true})
  }

  openModulePage(name) {
    this.props.history.push(`/admin/module/${name._id}/view`)
  }
  
  render(){

    console.log("question data", this.state.questionData )
    console.log("moduleData", this.state.moduleData)
    const { classes } = this.props;
    console.log(this.state.selectedID && this.state.selectedID._id)
    const {  selectedID, firstName } = this.state;
    const { moduleData } = this.props

  return (
    <div>
       <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.handleCloseModal.bind(this)}
            style={customStyles}
            ariaHideApp={false}
            aria={{
              labelledby: "heading",
              describedby: "full_description"
            }}>
              <div>
                <h1>WARNING:</h1>
                Are you sure you want to delete {selectedID && selectedID.name}?
                <br /><br />
                <Button raised onClick={this.deleteModuleContent.bind(this)}>Yes</Button>
                <Button className={classes.button} raised onClick={() => this.setState({modalOpen: false})}>No</Button>
                <button className="admin-close-button" onClick={() => this.setState({modalOpen: false})}>X</button>
              </div>
          </Modal>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Module</TableCell>
            <TableCell>Questions</TableCell>
            <TableCell>Add Questions?</TableCell>
            <TableCell>Delete?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!moduleData && moduleData.map(n => {
              return (
              <TableRow className="row" hover key={n._id}>
                <TableCell onClick={this.openModulePage.bind(this,n)}>{n.name}</TableCell>
                <TableCell>{this.questionData.bind(this, n)()}</TableCell>
                <TableCell><Button component={Link} to={`/admin/module/${n._id}/questions`} 
                  raised color="primary" >Add Questions</Button></TableCell>
                <TableCell><Button raised color="primary" onClick={this.getID.bind(this, n)}>Delete</Button></TableCell>
            </TableRow>
            );
          })}
        </TableBody>
        <TableFooter><Button component={Link} className="table-footer-button" raised color="primary" to="admin/module/new">Add New Module + </Button></TableFooter>
      </Table>
    </Paper>
    </div>
  );
 }
}

AdminModulesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
    padding                    : '5%',
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 20,
    height: 20
  },
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

export default withStyles(styles)(AdminModulesTable);