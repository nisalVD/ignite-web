import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableFooter from 'material-ui/Table/TableFooter';
import TableSortLabel from 'material-ui/Table/TableSortLabel';
import Button from 'material-ui/Button';
import { getModuleData, deleteModuleData, getQuestionData } from '../api/adminData'
import Modal from 'react-modal';


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


class ModulesTable extends Component {

  state = {
    moduleData: null,
    selectedID: null,
    modalOpen: false,
    questionData: 0,
}

  deleteModuleContent(){
    // console.log(!!this.state.selectedID && this.state.selectedID)
    deleteModuleData(this.state.selectedID._id)
    .then(( ) => console.log("deleted"))
    .then(() => {

        const {moduleData, selectedID} = this.state

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
  
  async componentDidMount(){
    getModuleData()
    .then(moduleData => this.setState({moduleData}))
    const questionData = await getQuestionData()
    this.setState({questionData: questionData})
    
  }
  
  render(){

    console.log("question data", this.state.questionData )
    console.log("moduleData", this.state.moduleData)
    const { classes } = this.props;
    console.log(this.state.selectedID && this.state.selectedID._id)
    const { moduleData, selectedID, firstName } = this.state;

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
                <button onClick={this.deleteModuleContent.bind(this)}>Yes</button>
                <button onClick={() => this.setState({modalOpen: false})}>No</button>
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
                <TableCell>{n.name}</TableCell>
                <TableCell>{this.questionData.bind(this, n)()}</TableCell>
                <TableCell><button>Add Questions</button></TableCell>
                <TableCell><button onClick={this.getID.bind(this, n)}>Delete</button></TableCell>
            </TableRow>
            );
          })}
        </TableBody>
        <TableFooter><button>Add New Module + </button></TableFooter>
      </Table>
    </Paper>
    </div>
  );
 }
}

ModulesTable.propTypes = {
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

export default withStyles(styles)(ModulesTable);