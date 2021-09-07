import React, { useState } from "react";
import Song from "./components/Song";
import Event from "./components/Event";
import Transaction from "./components/transaction";
import Report from "./components/Report";
//import "./App.css";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';

function App() {

  let [isEvent, setIsEvent] = useState("event");
  let [isTransac, setIsTransac] = useState([]);
  // let [isReport, setIsReport] = useState("report");

  const handleChangeView = (isEvent) => {
    setIsEvent(isEvent);
    setIsTransac(isTransac);
  };

  const eventView = () => {
    console.log("event event evenet");
    setIsEvent("event");
  }

  const songView = () => {
    console.log("song song song");
    setIsEvent("");
  }

  const transacView = () => {
    console.log("income");
    setIsTransac(isTransac);
  }

  // const reportView = () => {
  //   eee
  // }

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

  return (
  <div className={classes.root}>  
  <Container maxWidth="md">


     <Box display="flex" flexDirection="row" flexWrap="wrap" >
      <Box flexGrow={1}><img src = "https://i.postimg.cc/J45dRFFp/logo-presto-1.jpg" alt="Presto Logo"/></Box>  
      <Box><Button onClick={() => handleChangeView("event")}>Event List</Button></Box>

      <Box alignItems="flex-end"><Button color="primary" onClick={() => handleChangeView("")}>Song List</Button></Box>
      <Box alignItems="flex-end"><Button color="default" onClick={() => handleChangeView([])}>Transaction</Button></Box>
     </Box>
{/* 
     <span>{isEvent}  is true or false and so the rendered page </span>
      */}
    { 
      (isEvent === "event") ? <Event updateEvent={eventView}/> : (isEvent === "") ? <Song updateEvent={songView}/> : <Transaction transacList={transacView} />    
    }
  </Container>
  </div>
  
  )
}
export default App;