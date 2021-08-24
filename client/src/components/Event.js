import React, { useEffect, useState } from "react";
//import { makeStyles } from '@material-ui/core/styles';
//import Box from '@material-ui/core/Box';
//import Button from "@material-ui/core/Button";
//import Container from '@material-ui/core/Container';
//import { Grid } from '@material-ui/core';
//import TextField from '@material-ui/core/TextField';

//project is getter, 
//setProject is setter
export const Event = () => {
    let [event, setEvent] = useState([]);
    let [input, setInput] = useState({});

    useEffect(() => {
        getEvents();
    }, []);

    let date = new Date(Date.UTC)
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  
    const getEvents = () => {
        fetch("/event")
            .then(response => response.json())
            .then(event => {
                console.log(event);
                setEvent(event);
            })
            .catch(error => {
                console.log("Error");
            });
    };

    const handleSubmit = e => {
        addEvent();
    };

    const handleChange = e => {
        console.log(e.target.data);
        setInput({ ...input, [e.target.eventName]: e.target.location});
      };

    const handleRemove = (e, id) => {
        console.log(id);
        deleteEvent(id);
    };

    const addEvent = () => {
        fetch("/event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(input)
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            //setStudents(data);
            console.log("New Event Added", data);
          })
          .catch(err => {
            console.error("Error", err);
          });
      };


      const deleteEvent = id => {
        //console.log("in Fetch", id); //to check if it's passing through
        fetch(`/event/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            console.log(res);
            return res.json();
          })
          .then(res => {
            console.log(res);
            setEvent(res);
            console.log("Event Deleted");
          })
          .catch(err => {
            console.error(err.message);
          });
      };

  

  return (
    <div>
    <h3>ADD NEW EVENT</h3>

    <div className="bg-success p-2 text-white bg-opacity-10">
        <form onSubmit={e => handleSubmit(e)}>
          
          <label htmlFor="eventName" className="form-label">
            Event name:
          </label>
          <input
            name="eventName"
            id="eventName"
            type="text"
            value={input.eventName}
            onChange={e => handleChange(e)}
          ></input>{" "}
          &nbsp;
          
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            name="location"
            id="location"
            type="text"
            value={input.location}
            onChange={e => handleChange(e)}
          ></input>{" "}
          &nbsp;

          <label htmlFor="date" className="form-label">
            Location:
          </label>
          <input
            name="date"
            id="date"
            type="date"
            value={input.date}
            onChange={e => handleChange(e)}
          ></input>{" "}
          &nbsp;

          <button
            type="submit"
            className="btn btn-outline-light"
            value="submit"
          > SUBMIT
          </button>
        </form>
      </div>

    <div>
          {event.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.eventName}</td>
                <td>{item.location}</td>
                {/* <td>{item.date}</td> */}
                <td>{item.date}</td>
                <td>
                  <button
                    type="submit"
                    value="submit"
                    className="btn btn-outline-primary btn-sm"
                    onClick={e => {
                      handleRemove(e, item.id);
                    }}
                  >
                    REMOVE
                  </button>
                </td>
              </tr>
            );
          })}
        
    </div>
    </div>
  )
}

export default Event;
