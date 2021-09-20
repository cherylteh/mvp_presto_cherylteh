import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
// import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from "@material-ui/core";
// import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';
// import { Grid } from '@material-ui/core';
//import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
// import moment from 'moment'

export const Event = (props) => {
    let [event, setEvent] = useState([]);
    let [input, setInput] = useState({});
    
    const useStyles = makeStyles({
        table: {
          minWidth: 800,
          backgroundColor: "#FEF5E7 ",
        },
      });

      const classes = useStyles();
      
/* 
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: '#ffb74d',
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);

      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
 */

    // useEffect(() => {
    //     getEvents()
    // }, []); // check

    // const getEvent = () => {
      useEffect(() => {
        fetch("/event")
            .then(response => response.json())
            .then(event => {
                console.log(event);

                 for(let i=0; i<event.length; i++){
                    let tmpDate = event[i].date;
                    event[i].date  = `${formatDate(tmpDate)}`;
                    //console.log(event[i].date);
                }
                setEvent(event);
            })
            .catch(error => {
                console.log("Error in GetEvents", error.message);
            });
    },[]);


    const formatDate = (savedDate) => {
        if(savedDate === null) return ""; 
      
        let t = savedDate.split(/[-T:.]/)// Split timestamp into [ Y, M, D, h, m, s ]
        let newFormat = new Date(Date.UTC(t[0], t[1]-1, t[2]));// Apply each element to the Date function
        //let newFormat = new Date(Date.UTC);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        newFormat.toLocaleDateString(undefined, options)
        //console.log(newFormat);

        return newFormat;
        }

      

    const handleChange = e => {
        //console.log(e.target.value);
        setInput({ ...input, [e.target.name]: e.target.value});
        //console.log(input)
      };

    const handleSubmit = e => {
        addEvent();
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
            console.log("New Event Added", data);
            props.updateEvent();
          })
          .catch(err => {
            console.error("Error", err);
          });
      };

    const deleteEvent = id => {
       //console.log("in Fetch", id); 
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
        props.updateEvent();
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
          
          {/* <label htmlFor="eventName" className="form-label">
            Event name:
          </label> */}
          <TextField
            label="Event Name"
            name="eventName"
            id="eventName"
            type="text"
            onChange={(e) => handleChange(e)}
          />{" "}
          &nbsp; &nbsp;
          
          {/* <label htmlFor="location" className="form-label">
            Location:
          </label> */}
          <TextField
            label="Location"
            name="location"
            id="location"
            type="text"
            //value={input.location}
            onChange={(e) => handleChange(e)}
          />{" "}
          &nbsp; &nbsp;

          {/* <label htmlFor="date" className="form-label">
            Date:
          </label> */}
          <TextField
            label="Date"
            name="date"
            id="date"
            type="date"
            // className={classes.TextField}
            InputLabelProps={{
                 shrink: true,
            }}
            //value={input.date}
            onChange={(e) => handleChange(e)}
          />{" "}
          &nbsp;

          <Button 
            variant="outlined" 
            type="submit"
            className="btn btn-outline-light"
            value="submit"
          > Add Event
          </Button>
        </form>
      </div>

  <h3>EVENT LIST</h3>
    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="a densed table">
        <TableHead>
            <TableRow>
                <TableCell><h4>DATE</h4></TableCell>
                <TableCell><h4>EVENT</h4></TableCell>
                <TableCell><h4>LOCATION</h4></TableCell>
            </TableRow>
        </TableHead>

        {/* <TableBody>
          {event.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{moment(item.date).format('LL')}</TableCell>
                <TableCell>{item.eventName}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                <DeleteIcon 
                    style={{cursor:'pointer'}}
                    color="primary"
                    type="submit"
                    value="submit"
                    //className="btn btn-outline-primary btn-sm"
                    onClick={e => {
                      handleRemove(e, item.id);
                    }}
                    />
                
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody> */}
      </Table>
    </TableContainer>
    
    </div>
  )
}

export default Event;
