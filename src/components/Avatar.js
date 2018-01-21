import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = {
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#fab',
    width: '100px',
    height: '100px',
    fontSize: '48px',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
};

function LetterAvatar(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar className={classes.avatar}>N</Avatar>
    </div>
  );
}

LetterAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterAvatar);