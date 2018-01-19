import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import IgniteLogo from '../img/ignite_logo.png';
import CalendarIcon from '../img/Google-Calendar-icon.png'
import FacebookIcon from '../img/facebook-icon.svg.png'
import LiveChatIcon from '../img/Live-Chat-Icon.png'
// import MenuIcon from 'material-ui-icons/Menu';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavBar({
    classes,
    isAuthenticated = false,
}) {
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="#FAFAFA">
        <Toolbar>

            <div className="annoying-div-2">
                <a href="/"><img src={IgniteLogo} alt="Ignite Logo" class="ignite-logo"/></a>
            </div>
            {!!isAuthenticated ? (
                <div className="nav-parent-div">
                    <a href="./calendar"><img src={CalendarIcon} alt="Google Calendar Icon" class="nav-icon"/></a>
                    <a href="./facebook-group-feed"><img src={FacebookIcon} alt="Facebook Icon" class="nav-icon"/></a>
                    <a href="./live-chat"><img src={LiveChatIcon} alt="Live Chat Icon" class="nav-icon"/></a>
                <div className="annoying-div">
                    {/* <a href="./calendar"><img src={CalendarIcon} alt="Google Calendar Icon" class="nav-icon"/></a>
                    <a href="./facebook-group-feed"><img src={FacebookIcon} alt="Facebook Icon" class="nav-icon"/></a>
                    <a href="./live-chat"><img src={LiveChatIcon} alt="Live Chat Icon" class="nav-icon"/></a>
                  <a href="./blog">blog</a> */}
                    <a href="./profile"><button type="button" className="user-button">
                        USER &nbsp;
                        <i className="fa fa-user-o fa-lg"/>
                    </button>
                    </a>
                </div>
                  </div>
            ) : (
                <div className="annoying-div">
                    <a href="./sign-in"><button type="button" className="login-button">SIGN IN</button></a>
                </div>
            )
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);