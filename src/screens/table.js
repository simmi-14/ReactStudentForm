import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

import Custom_Button from "../components/button";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  useEffect(() => {
    let allUsersData = [];
    try {
      if (window.localStorage.getItem("users"))
        allUsersData = window.localStorage.getItem("users");
      if (allUsersData.length && typeof allUsersData !== "undefined") {
        allUsersData = JSON.parse(allUsersData);
        // setAllUsersData(allUsersData);
        setUser(allUsersData);
      }
    } catch (e) {
      console.log("CAUGHT ERROR:Table", e);
    }
  }, []);
  const editUser = (index) => {
    window.localStorage.setItem("edit_user", index);
    props.history.push("/form");
  };

  const addnewUser = () => {
    window.localStorage.setItem("edit_user", -1);
    props.history.push("/form");
  };

  const removeUser = (index) => {
    let user1 = [...user];
    user1.splice(index, 1);
    setUser(user1);
    window.localStorage.setItem("users", JSON.stringify(user1));
  };
  return (
      <div>
          <div style={{width:'20%', marging:16, padding:16}}>
            <Custom_Button
                type={"button"}
                name={"Add New Entry"}
                onClick={() => addnewUser()}
                />
        </div>
        {/*
            <IconButton
                onClick={() => addnewUser()}
                aria-label="add"
            >
                <ControlPointIcon />
            </IconButton>
        */}
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Mobile</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Hobbies</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.length > 0
            ? user.map((row, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.fname} {row.lname}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.mobile}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.gender}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.hobby.join(", ")}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <div>
                        <IconButton
                          color="secondary"
                          aria-label="delete"
                          onClick={() => removeUser(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => editUser(index)}
                          color="primary"
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            : null}
        </TableBody>
        <TableFooter>
            {
                (!user.length > 0)
                ?
                    <TableRow>
                        <StyledTableCell>No data to show</StyledTableCell>
                    </TableRow>
                : null
            }
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  );
}
