import React, { Component } from 'react';
import Modal from 'react-modal';
import UserInfoFormSignUp from './UserInfoFormSignUp'

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
            aria={{
              labelledby: "heading",
              describedby: "full_description"
            }}>
              <div>
                <h1>Update My Details</h1>
                <UserInfoFormSignUp/>
              </div>
          </Modal>
    </div>
  );
 }
}


export default UpdateDetailsButton;