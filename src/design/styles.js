import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    submit_btn: {
      background: theme.background,
      border: 0,
      fontSize: 16,
      borderRadius: 3,
      boxShadow: theme.boxShadow,
      color: 'white',
      height: 48,
      padding: '0 30px',
      width:"100%",
      elevation:10,
      ///
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: 'red',
        boxShadow: 'none',
        opacity: 0.8
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },    
}));


export const useStyles_testU = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));
