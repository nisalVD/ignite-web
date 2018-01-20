import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableFooter from 'material-ui/Table/TableFooter';
import TableSortLabel from 'material-ui/Table/TableSortLabel';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(iD, firstName, lastName, email, password, dateOfBirth, address, postCode, state) {
  id += 1;
  return { id, iD, firstName, lastName, email, password, dateOfBirth, address, postCode, state };
}

const data = [
  createData(1, 'David', 'Holmes', 'david@gmail.com', 'password', '1/1/1990', '123 Sesame Street', '1111', 'VIC'),
  createData(2, 'Nisal', 'Don', 'nisal@gmail.com', 'password', '1/1/1990', '123 Sesame Street', '1111', 'VIC'),
  createData(3, 'Patrick', 'Smith', 'patrick@gmail.com', 'password', '1/1/1990', '123 Sesame Street', '1111', 'VIC'),
  createData(4, 'Ruegen', 'Aschenbrenner', 'ruegen@gmail.com', 'password', '1/1/1990', '123 Sesame Street', '1111', 'VIC'),
  createData(5, 'Matt', 'McKenzie', 'matt@gmail.com', 'password', '1/1/1990', '123 Sesame Street', '1111', 'VIC'),
];

function AdminTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell numeric>Date of Birth</TableCell>
            <TableCell>Address</TableCell>
            <TableCell numeric >Post Code</TableCell>
            <TableCell>State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
              return (
              <TableRow className="row" hover key={n.id}>
                <TableCell numeric>{n.iD}</TableCell>
                <TableCell>{n.firstName}</TableCell>
                <TableCell >{n.lastName}</TableCell>
                <TableCell >{n.email}</TableCell>
                <TableCell>{n.password}</TableCell>
                <TableCell numeric>{n.dateOfBirth}</TableCell>
                <TableCell>{n.address}</TableCell>
                <TableCell numeric>{n.postCode}</TableCell>
                <TableCell>{n.state}</TableCell>
            </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

AdminTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTable);