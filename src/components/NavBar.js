import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import IgniteLogo from '../img/ignite_logo.png'; 
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

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="#FAFAFA">
        <Toolbar>

          <Typography type="title" color="inherit" className={classes.flex}>
            <div className="annoying-div-2">
                <img src={IgniteLogo} alt="Ignite Logo" class="ignite-logo"/>
            </div>
            </Typography>
            <div className="annoying-div">
                <button type="button" className="login-button">SIGN IN</button>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);