import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IgniteLogo from '../img/ignite_logo.png';
import CalendarIcon from '../img/Google-Calendar-icon.png'
import FacebookIcon from '../img/facebook-icon.svg.png'
import LiveChatIcon from '../img/Live-Chat-Icon.png'
import { Link } from "react-router-dom"

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
      <AppBar position="fixed" color="default">
        <Toolbar>
            <div className="annoying-div-2">
                <Link to={`/`}><img src={IgniteLogo} alt="Ignite Logo" className="ignite-logo"/></Link>
            </div>
            {!!isAuthenticated ? (
                <div className="nav-parent-div">
                    <Link to={`./calendar`}><img src={CalendarIcon} alt="Google Calendar Icon" className="nav-icon"/></Link>
                    <a href="https://www.facebook.com/Igniteau/" rel="noopener noreferrer" target="_blank"><img src={FacebookIcon} alt="Facebook Icon" className="nav-icon"/></a>
                    <Link to={`./#blog`}><img src={LiveChatIcon} alt="Blog Icon" className="nav-icon"/></Link>
                    <a href="./#blog">BLOG</a>
                <div className="annoying-div">
                    <Link to={`./profile`}>
                      <button type="button" className="user-button">
                          USER &nbsp;
                          <i className="fa fa-user-o fa-lg"/>
                      </button>
                    </Link>
                </div>
                  </div>
            ) : (
              <div className="annoying-div">
                <Link to={`./sign-in`}><button type="button" className="login-button">SIGN IN</button></Link>
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