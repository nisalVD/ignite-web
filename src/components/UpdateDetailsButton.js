import React, { Component } from 'react';
import Modal from 'react-modal';
import UserInfoFormSignUp from './UserInfoFormSignUp'
import UserInforFormUpdate from './UserInfoFormUpdate'
import { withStyles } from 'material-ui/styles';

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

class UpdateDetailsButton extends Component {

  state = {
    modalOpen: false,
}

  handleOpenModal() {
      this.setState({modalOpen: true});
  }

  handleCloseModal () {
    this.setState({ modalOpen: false });
  }

  render(){

  return (
    <div>
        <button className="update-details-button" onClick={() => this.setState({modalOpen: true})}>UPDATE MY DETAILS</button>

        <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.handleCloseModal.bind(this)}
            ariaHideApp={false}
            style={customStyles}
            aria={{
              labelledby: "heading",
              describedby: "full_description"
            }}>
              <div className="modal-update-div">
                <h1>Update My Details</h1>
                <br />
                <UserInfoFormSignUp/>
                {/* <UserInfoFormUpdate onUpdateUser={this.props.onUpdateUser}/> */}
              </div>
          </Modal>
    </div>
  );
 }
}

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

export default  withStyles(styles)(UpdateDetailsButton);
