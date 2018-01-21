import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableFooter from 'material-ui/Table/TableFooter';
import TableSortLabel from 'material-ui/Table/TableSortLabel';
import Button from 'material-ui/Button';
import { getModuleData, deleteModuleData } from '../api/adminData'
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
    modalOpen: false
}

  deleteModuleContent(){
    // console.log(!!this.state.selectedID && this.state.selectedID)
    deleteModuleData(this.state.selectedID._id)
    .then(( ) => console.log("deleted"))
    .then(() => {
        const mappedModuleData = this.state.moduleData.map((moduleData, id, arr) => {
            if (moduleData._id === this.state.selectedID){
                arr.splice(id, 1)
            }
            return arr
        })
        console.log("mapped module data", mappedModuleData)
        this.setState({moduleData: mappedModuleData})
        this.setState({modalOpen: false})
        console.log("this.state.moduleData", this.state.moduleData)
    }) 
}

  getID(selectedID){
    this.setState({selectedID})
    this.setState({modalOpen: true})
  }
  
  componentDidMount(){
    getModuleData()
    .then(moduleData => this.setState({moduleData}) )
  }
  
  render(){
    
    console.log("moduleData", this.state.moduleData)
    const { classes } = this.props;
    console.log(this.state.selectedID && this.state.selectedID._id)
    const { moduleData, selectedID, firstName } = this.state;

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
            <TableCell>Delete?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!moduleData && moduleData.map(n => {
              return (
            //   <TableRow onClick={this.getID.bind(this, n)} className="row" hover key={n._id}>
              <TableRow className="row" hover key={n._id}>
                <TableCell>{n.name}</TableCell>
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