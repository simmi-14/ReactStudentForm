import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {useStyles} from '../design/styles';

function Btn(props) {
    const classes = useStyles();
    return (
    <button type={props.type} className={classes.submit_btn} onClick={()=>props.onClick()}>
      {props.name}
    </button>
  );
}

const Custom_Button =(props)=> {
  return (
        <ThemeProvider
          theme={{
            background: 'linear-gradient(45deg,#357a38 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(70, 203, 243, .3)',
          }}
        >
          <Btn {...props}/>
        </ThemeProvider>
  );
}

export default Custom_Button;