import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";

//****************************************************************Checkbox ELEMENT
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//****************************************************************RADIO ELEMENT
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
//****************************************************************Custom button ELEMENT
import Custom_Button from "../components/button";
//****************************************************************Design and Icon ELEMENT
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import { useStyles_testU } from "../design/styles";

const SignIn_Form = (props) => {
  const classes = useStyles_testU();

  const [user, setUser] = useState({});
  const [allUsersData, setAllUsersData] = useState([]);
  const [singleUser, setSingleUser] = useState(-1);

  useEffect(() => {
    let allUsersData = [];
    try {
      if (window.localStorage.getItem("users"))
        allUsersData = window.localStorage.getItem("users");
      if (allUsersData.length && typeof allUsersData !== "undefined") {
        allUsersData = JSON.parse(allUsersData);
        setAllUsersData(allUsersData);
      }

      if (allUsersData.length && window.localStorage.getItem("edit_user")) {
        let userEdit = JSON.parse(window.localStorage.getItem("edit_user"));
        if (userEdit > -1 && userEdit < allUsersData.length)
          setUser(allUsersData[userEdit]);
        setSingleUser(userEdit);
      }
    } catch (e) {
      console.log("CAUGHT ERROR:Table", e);
    }
  }, []);

  const handleDataUpdate = (ele, key) => {
    if(!key)
        key = ele.target.attributes.getNamedItem("id").value;

    if(ele.target.type === 'checkbox')
    {
      let hobbies = {...user};
      if(!hobbies.hasOwnProperty('hobby'))
        hobbies.hobby = [];
      if(ele.target.checked && !(hobbies.hobby.includes(ele.target.value)))
        hobbies.hobby.push(ele.target.value);
      else
        hobbies.hobby.splice(hobbies.hobby.indexOf(ele.target.value), 1);
      setUser(hobbies);
    }
    else
    {
      setUser({
        ...user,
        [key]: ele.target.value,
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let error = [];
    if (!(user.fname && user.lname))
      error.push("No/Wrong Frist Name/Email");
    if (!user.email.includes('@'))
      error.push("Unformatted Email");
    if(error.length)
    {
      alert("" +  error.join(', '));
      return;
    }
    if (singleUser < 0) allUsersData.push(user);
    else allUsersData[singleUser] = user;
    window.localStorage.setItem("users", JSON.stringify(allUsersData));
    props.history.push("/");
  };

  const showUsers = () => {
    // window.localStorage.setItem("edit_user", -1);
    props.history.push("/");
  };

  return (
    <Container component="main" maxWidth="sm">
      <div style={{width:'40%', marging:16, padding:16}}>
            <Custom_Button
                type={"button"}
                name={"Show Users List"}
                onClick={() => showUsers()}
                />
          </div>
      <Card className={classes.root} style={{ padding: 18 }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar
            className={classes.avatar}
            style={{ backgroundColor: "#357a38" }}
          >
            <AssignmentIcon />
          </Avatar>
          <Typography component="h1">
            <span style={{ color: "#121858", fontWeight: "bold" }}>
              Student Data Form
            </span>
          </Typography>

          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              type="text"
              name="user[fname]"
              value={user.fname ? user.fname : ""}
              onChange={handleDataUpdate}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fname"
              label="First Name"
              autoComplete=""
              autoFocus
            />

            <TextField
              type="text"
              name="user[lname]"
              value={user.lname ? user.lname : ""}
              onChange={handleDataUpdate}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lname"
              label="Last Name"
              autoComplete=""
            />

            <TextField
              type="text"
              name="user[email]"
              value={user.email ? user.email : ""}
              onChange={handleDataUpdate}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
            />

            <TextField
              type="number"
              name="user[mobile]"
              value={user.mobile ? user.mobile : ""}
              onChange={handleDataUpdate}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile Phone"
              autoComplete=""
              maxLength="12"
            />

            <TextField
              type="password"
              name="user[password]"
              value={user.password ? user.password : ""}
              onChange={handleDataUpdate}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              autoComplete="current-password"
            />

            <Typography component="h5">
              <span style={{ color: "#121858", fontWeight: "bold", alignSelf: "left" }}>
              Gender
              </span>
            </Typography>
            <RadioGroup aria-label="user[gender]" name="user[gender]" id="gender" value={user.gender ? user.gender : ""} onChange={(e)=>handleDataUpdate(e, 'gender')}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>

            <Typography component="h5">
              <span style={{ color: "#121858", fontWeight: "bold", alignSelf: "left" }}>
              Hobby
              </span>
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={(user.hobby && user.hobby.includes('Reading')) ? true : false} onChange={(e)=>handleDataUpdate(e, 'hobby')} name="user[hobby][]" />}
                label="Reading" value="Reading"
              />
              <FormControlLabel
                control={<Checkbox checked={(user.hobby && user.hobby.includes('Coding')) ? true : false} onChange={(e)=>handleDataUpdate(e, 'hobby')} name="user[hobby][]" />}
                label="Coding" value="Coding"
              />
              <FormControlLabel
                control={<Checkbox checked={(user.hobby && user.hobby.includes('Playing')) ? true : false} onChange={(e)=>handleDataUpdate(e, 'hobby')} name="user[hobby][]" />}
                label="Playing" value="Playing"
              />
            </FormGroup>

            <Custom_Button
              type={"submit"}
              name={"Submit"}
              onClick={() => ""}
            />
          </form>
        </div>
      </Card>
    </Container>
  );
};

export default SignIn_Form;
