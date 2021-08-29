import React, { useState } from "react";
import Song from "./components/Song";
import Event from "./components/Event";
//import "./App.css";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
//import { flexbox } from '@material-ui/system';
import Button from "@material-ui/core/Button";
//import ButtonBase from '@material-ui/core/ButtonBase';
//import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//import Divider from '@material-ui/core/Divider';
//import Grid from '@material-ui/core/Grid';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
// import TextField from '@material-ui/core/TextField';



function App() {

  const [isEvent, setIsEvent] = useState(true);

  const handleChangeView = (isEvent) => {
    setIsEvent(isEvent);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    table: {
      minWidth: 800,
      backgroundColor: "#FEF5E7 ",
    },
  }));

  const classes = useStyles();

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      '&:hover': {
        backgroundColor: deepPurple[700],
      },
    },
  }))(Button);
  


  return (
  <div className={classes.root}>  
  <Container maxWidth="md">

     <Box display="flex" flexDirection="row" flexWrap="wrap" >
      <Box flexGrow={1}><img src = "https://i.postimg.cc/J45dRFFp/logo-presto-1.jpg" alt="Presto Logo"/></Box> 
      <Box><Button onClick={() => handleChangeView(true)}>Event List</Button></Box>
      <Box alignItems="flex-end"><Button color="primary" onClick={() => handleChangeView(false)}>Song List</Button></Box>
     </Box>

    {/* <Grid container spacing={1}
          direction="row">
      <Grid item xs={7} justifyContent="flex-start">
      <img src = "https://i.postimg.cc/J45dRFFp/logo-presto-1.jpg" alt="Presto Logo"/>
      </Grid>

      <Grid item xs={5} justifyContent="flex-end" alignItems="flex-end">
        
        <div><Button onClick={() => handleChangeView(true)}>Event List</Button> &nbsp; 
        <Button color="primary" onClick={() => handleChangeView(false)}>Song List</Button></div>
      </Grid> */}

    {
      (isEvent) ? <Event/> : <Song/>     
    }  

  </Container>
  </div>
  
    
  )
}
export default App;