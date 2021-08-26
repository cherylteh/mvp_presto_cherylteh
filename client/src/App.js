import React, { useState } from "react";
import Song from "./components/Song";
import Event from "./components/Event";
//import "./App.css";
import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Button from "@material-ui/core/Button";
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import { Grid } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';



function App() {

  const [isEvent, setIsEvent] = useState(true);

  const handleChangeView = (isEvent) => {
    setIsEvent(isEvent);
  };


  return (
    
    <Container maxWidth="md">
      <img src = "https://i.postimg.cc/Ls4C6NSp/logo-presto-wide.png"/>
      
    WELCOME TO PRESTO
    
    <button onClick={() => handleChangeView(true)}>EVENT</button>

    <button onClick={() => handleChangeView(false)}>SONG LIST</button>

    {

      (isEvent) ? <Event/> : <div style={{backgroundColor:"yellow"}}><Song/></div>     
    }    
    </Container>
  
    
  )
}
export default App;