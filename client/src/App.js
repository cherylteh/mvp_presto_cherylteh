import React, { useState } from "react";
import Song from "./components/Song";
import Event from "./components/Event";
//import "./App.css";


function App() {

  const [isEvent, setIsEvent] = useState(true);

  const handleChangeView = (isEvent) => {
    setIsEvent(isEvent);
  };


  return (
   <div>
    WELCOME TO PRESTO
    
    <button onClick={() => handleChangeView(true)}>EVENT</button>

    <button onClick={() => handleChangeView(false)}>SONG LIST</button>

    {
      (isEvent) ? <Event/> : <Song/>        
    }    
    
    </div>
  )
}

export default App;