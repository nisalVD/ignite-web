import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 87,
  width: 610,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const Module = ({
  name,
  clickModule,
  selectedModule,
  isCompleted
}) => (
  <div onClick={(e) => {
    clickModule(e, selectedModule)
  }} className="modules">
    <Paper style={style}>
      {name}
      { isCompleted && 
        <strong>Completed</strong>
      }
    </Paper>
  </div>
);

export default Module;




