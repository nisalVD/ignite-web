import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 500,
    height: 100
  }
});

const Module = ({
  name,
  clickModule,
  selectedModule,
  isCompleted,
  disabled,
  classes
}) => (
  <div>
      {/* { 
        isCompleted && 
        <strong>Completed</strong>
      } */}
      <Button onClick={(e) => {
        clickModule(e, selectedModule) }}
        raised 
        color="primary"
        className={classes.button}
        disabled={isCompleted}
      >
      {name}
    </Button>
    <br/>
  </div>

);

export default withStyles(styles)(Module);