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
  moduleId
}) => (
  <div onClick={(e) => {
    clickModule(e, moduleId)
  }} className="modules">
    <Paper style={style} zDepth={3} >
        {name}
    </Paper>
  </div>
);

export default Module;




