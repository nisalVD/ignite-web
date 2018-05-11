import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import TableFooter from "material-ui/Table/TableFooter";
import TableSortLabel from "material-ui/Table/TableSortLabel";
import Button from "material-ui/Button";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { deleteFeedData, listFeeds } from '../api/feed';
import { deleteModuleData, getQuestionData, postNewFeed } from "../api/adminData";

class AdminFeedTable extends Component {
  state = {
    selectedID: null,
    modalOpen: false,
    feedModalOpen: false,
    submitDisabled: true,
    title: "",
    body: "",
    feedData: null
  };

  componentDidMount() {
    listFeeds()
    .then(feedData => this.setState({feedData}));
  }

  deleteFeedContent(){
    const {feedData} = this.state

    deleteFeedData(this.state.selectedID._id)
    .then((feed) => {
      const id = feed._id
      const removedFeedData = feedData.filter(feed => feed._id !== id)
      this.setState({feedData: removedFeedData})
      this.setState({modalOpen: false})
    })
  }

  handleCloseModal() {
    this.setState({ modalOpen: false });
  }

  handleCloseFeedModal() {
    this.setState({ feedModalOpen: false });
  }

  openFeedModal = () => {
    this.setState({ feedModalOpen: true });
  };

  getID(selectedID) {
    this.setState({ selectedID });
    this.setState({ modalOpen: true });
  }

  checkFeedInput = () => {
    setTimeout(() => {
      console.log("Title: " + this.state.title);
      console.log("Body: " + this.state.body);

      if (this.state.title && this.state.body) {
      this.setState({ submitDisabled: false });
      } else {
      this.setState({ submitDisabled: true });
      }

    }
    , 0)
  };

  submitNewFeed = () => {
    postNewFeed(this.state.title, this.state.body)
    .then(this.setState({openFeedModal: false}))
  }

  render() {
    const { classes } = this.props;
    const { selectedID, firstName } = this.state;
    const { feedData } = this.state;

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
          }}
        >
          <div>
            <h1>WARNING:</h1>
            Are you sure you want to delete {selectedID && selectedID.heading}?
            <br />
            <br />
            <Button raised onClick={this.deleteFeedContent.bind(this)}>
              Yes
            </Button>
            <Button
              className={classes.button}
              raised
              onClick={() => this.setState({ modalOpen: false })}
            >
              No
            </Button>
            <button
              className="admin-close-button"
              onClick={() => this.setState({ modalOpen: false })}
            >
              X
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.feedModalOpen}
          onRequestClose={this.handleCloseFeedModal.bind(this)}
          style={customStyles}
          ariaHideApp={false}
          aria={{
            labelledby: "heading",
            describedby: "full_description"
          }}
        >
          <div>
            <h1>ADD NEW FEED POST:</h1>
            <br />
            <input
              placeholder={"Title"}
              style={{ borderWidth: 1, width:'100%' }}
              onKeyUp={e => [
                this.setState({ title: e.target.value }),
                this.checkFeedInput()
              ]}
            />
            <br />
            <br />
            <textarea
              placeholder={"Body"}
              style={{ width: '100%', height: 200, fontSize: 14 }}
              onKeyUp={e => [
                this.setState({ body: e.target.value }),
                this.checkFeedInput()
              ]}
            />
            <br />
            <br />
            <Button raised disabled={this.state.submitDisabled} onClick={this.submitNewFeed}>
              Submit
            </Button>
            <Button
              className={classes.button}
              raised
              onClick={() => this.setState({ feedModalOpen: false })}
            >
              Close
            </Button>
            <br />
            <br />
            <br />
            <br />
            <button
              className="admin-close-button"
              onClick={() => this.setState({ feedModalOpen: false })}
            >
              X
            </button>
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
              {!!feedData &&
                feedData.map(n => {
                  return (
                    <TableRow className="row" hover key={n._id}>
                      <TableCell>{n.heading}</TableCell>
                      <TableCell>
                        <Button
                          raised
                          color="primary"
                          onClick={this.getID.bind(this, n)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <Button
                className="table-footer-button"
                raised
                color="primary"
                onClick={this.openFeedModal}
              >
                Add New Feed +{" "}
              </Button>
            </TableFooter>
          </Table>
        </Paper>
      </div>
    );
  }
}

AdminFeedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    position: "absolute",
    top: "20%",
    left: "20%",
    right: "20%",
    bottom: "20%",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "5%"
  }
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 20,
    height: 20
  },
  root: {
    width: "90%",
    marginLeft: "5%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

export default withStyles(styles)(AdminFeedTable);
