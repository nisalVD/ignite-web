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
    <Paper style={style} zDepth={3} >
      {name}
      <div classname={!!isCompleted && "module-completed"} >
        <strong>Completed</strong>
      </div>
    </Paper>
  </div>
);

export default Module;




