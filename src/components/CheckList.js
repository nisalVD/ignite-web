import React, {Component} from 'react'
import Modal from 'react-modal'
import {withStyles} from 'material-ui/styles'
import {userFinishedChecklist} from '../api/updateUser'

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
})

class CheckList extends Component {
  state = {
    modalOpen: false,
    option1Check: false,
    option2Check: false,
    option3Check: false,
    showSubmit: true,
    buttonClass: 'sign-in-button',
  }

  handleCloseModal() {
    this.setState({modalOpen: false})
  }

  handleOpenModal() {
    this.setState({modalOpen: true})
  }

  handleAllOptionChecked = () => {
    this.setState({modalOpen: true})
    userFinishedChecklist()
      .then(res => {
        console.log('res', res.data)
      })
  }

  render() {
    return (
      <div>
        <div>
          <div className="induction-form">
            <label>
              <input
                className="induction-radio"
                type="checkbox"
                value="option1"
                checked={this.state.option1Check}
                onChange={e =>
                  this.setState({option1Check: !this.state.option1Check})
                }
              />
              Completed Modules
            </label>
            <br />
            <label>
              <input
                className="induction-radio"
                type="checkbox"
                value="option2"
                checked={this.state.option2Check}
                onChange={e =>
                  this.setState({option2Check: !this.state.option2Check})
                }
              />
              Sent Photo ID to Ignite
            </label>
            <br />
            <label>
              <input
                className="induction-radio"
                type="checkbox"
                value="option3"
                checked={this.state.option3Check}
                onChange={e =>
                  this.setState({option3Check: !this.state.option3Check})
                }
              />
              Working With Children Check
            </label>
            <br />
            <br />
            {this.state.option1Check &&
              this.state.option2Check &&
              this.state.option3Check && (
                <input
                  onClick={this.handleAllOptionChecked}
                  type="submit"
                />
              )}
          </div>
        </div>

        <div>
          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.handleCloseModal.bind(this)}
            ariaHideApp={false}
            style={customStyles}
            aria={{
              labelledby: 'heading',
              describedby: 'full_description',
            }}>
            <div>
              <h1>Thank You!</h1>
              Your information has been passed on to the Volunteers Coordinator
              at Ignite and we will be in touch with you as soon as possible.
              <br />
              <br />
              <button
                className="admin-close-button"
                onClick={() => this.setState({modalOpen: false})}>
                X
              </button>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    bottom: '20%',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '5%',
  },
}

export default withStyles(styles)(CheckList)
