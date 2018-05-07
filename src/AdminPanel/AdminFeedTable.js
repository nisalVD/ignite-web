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

import { deleteModuleData, getQuestionData } from '../api/adminData';
import { deleteFeedData } from '../api/feed';

class AdminFeedTable extends Component {

  state = {
    selectedID: null,
    modalOpen: false,
  }

  deleteFeedContent(){

    const {feedData} = this.props

    deleteFeedData(this.state.selectedID._id)
    .then(() => {
      const {selectedID} = this.state
      const {feedData} = this.props

      const mappedFeed = feedData.reduce((acc, next) => {
          if (next._id !== selectedID._id) {
            acc.push(next)
          }
          return acc
        },[])
        this.setState({feedData: mappedFeed})
        this.setState({modalOpen: false})
    })
  }

  handleCloseModal () {
    this.setState({ modalOpen: false });
  }

  getID(selectedID){
    this.setState({selectedID})
    this.setState({modalOpen: true})
  }

  render(){

    const { classes } = this.props;
    const { selectedID, firstName } = this.state;
    const { feedData } = this.props

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
                Are you sure you want to delete {selectedID && selectedID.heading}?
                <br /><br />
                <Button raised onClick={this.deleteFeedContent.bind(this)}>Yes</Button>
                <Button className={classes.button} raised onClick={() => this.setState({modalOpen: false})}>No</Button>
                <button className="admin-close-button" onClick={() => this.setState({modalOpen: false})}>X</button>
              </div>
          </Modal>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Feed Title</TableCell>
            <TableCell>Delete?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!feedData && feedData.map(n => {
              return (
              <TableRow className="row" hover key={n._id}>
                <TableCell>{n.heading}</TableCell>
                <TableCell><Button raised color="primary" onClick={this.getID.bind(this, n)}>Delete</Button></TableCell>
            </TableRow>
            );
          })}
        </TableBody>
        <TableFooter><Button className="table-footer-button" raised color="primary">Add New Feed + </Button></TableFooter>
      </Table>
    </Paper>
    </div>
  );
 }
}

AdminFeedTable.propTypes = {
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

export default withStyles(styles)(AdminFeedTable);
