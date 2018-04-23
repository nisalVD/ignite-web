import React, { Component } from "react";
import { Button, CircularProgress } from "material-ui";
import { Link } from "react-router-dom";
import { changePassword } from "../api/updateUser";
import "./UserChangePassword.css";

class UserChangePassword extends Component {
  state = {
    showType: "password",
    buttonText: "Show Password",
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
    passwordCheck: false,
    passwordCheckText: "",
    passwordCheckTextClass: "redText",
    disabled: true,
    loading: false
  };

  buttonTextCheck() {
    if (this.state.buttonText == "Show Password") {
      this.setState({ buttonText: "Hide Password" });
    } else {
      this.setState({ buttonText: "Show Password" });
    }
  }

  showPasswordCheck() {
    if (this.state.showType == "password") {
      this.setState({ showType: "text" });
    } else {
      this.setState({ showType: "password" });
    }
  }

  clickShowButton() {
    this.buttonTextCheck();
    this.showPasswordCheck();
  }

  comparePasswords() {
    setTimeout(() => {
      if (
        this.state.newPassword == this.state.newPasswordConfirmation &&
        this.state.newPassword &&
        this.state.newPasswordConfirmation
      ) {
        this.setState({
          passwordCheckText: "Passwords match!",
          passwordCheckTextClass: "greenText",
          disabled: false
        });
      } else if (
        this.state.newPassword == "" &&
        this.state.newPasswordConfirmation == ""
      ) {
        this.setState({
          passwordCheckText: ""
        });
      } else {
        this.setState({
          passwordCheckText: "Passwords do not match!",
          passwordCheckTextClass: "redText",
          disabled: true
        });
      }
    }, 0);
  }

  async submitPassword() {
    try {
      // Show spinner / hide button
      this.setState({ loading: true });
      // Change Password function
      const success = await changePassword(
        this.state.oldPassword,
        this.state.newPassword
      );
      console.log(success);

      this.setState({ 
        loading: false,
        passwordCheckText: "Your password was successfully changed.",
        passwordCheckTextClass: "greenText",
     });
      // Change error message to "Password Successfully Changed"
    } catch (error) {
      console.log(error);
      this.setState({ 
        loading: false,
        passwordCheckText: "There was an error changing your password. Please try again.",
        passwordCheckTextClass: "redText",
     });
      // Change error message to "There was an error changing your password. Please try again."
    }
  }

  render() {
    return (
      <form className="change-password-form-container">
        <center>
          <h1 id="cp-heading"> Change Password </h1>
        </center>
        <input
          onKeyUp={e => this.setState({ oldPassword: e.target.value })}
          type={this.state.showType}
          placeholder="Old Password"
          className="change-password-input"
        />
        <input
          onKeyUp={e => [
            this.setState({ newPassword: e.target.value }),
            this.comparePasswords()
          ]}
          type={this.state.showType}
          placeholder="New Password"
          className="change-password-input"
        />
        <input
          onKeyUp={e => [
            this.setState({ newPasswordConfirmation: e.target.value }),
            this.comparePasswords()
          ]}
          type={this.state.showType}
          placeholder="New Password Confirmation"
          className="change-password-input"
        />

        <br />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            raised
            color="secondary"
            id="submit-password-change"
            className="homepage-module-button"
            onClick={() => this.clickShowButton()}
          >
            {this.state.buttonText}
          </Button>

          <span
            id="password-check-text"
            className={this.state.passwordCheckTextClass}
          >
            {this.state.passwordCheckText}
          </span>

          {this.state.loading ? (
            <div id="loader-div">
              <CircularProgress color="secondary"/>
            </div>
          ) : (
            <Button
              disabled={this.state.disabled}
              raised
              color="primary"
              id="submit-password-change"
              className="homepage-module-button"
              onClick={() => this.submitPassword()}
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    );
  }
}

export default UserChangePassword;
