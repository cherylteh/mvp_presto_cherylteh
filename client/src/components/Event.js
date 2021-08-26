import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from "@material-ui/core";
// import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
// import Container from '@material-ui/core/Container';
// import { Grid } from '@material-ui/core';
//import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'

export const Event = () => {
    let [event, setEvent] = useState([]);
    let [input, setInput] = useState({});
    
    const useStyles = makeStyles({
        table: {
          minWidth: 800,
          backgroundColor: "#FEF5E7 ",
        },
      });

      const classes = useStyles();
      

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


    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
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
    };
/* 
    const calculateDate = (savedDate) => {
        let savedDate = new Date();
        
        let newFormat = savedDate.toLocaleString();
        return newFormat;
    }
 */

/* 
    const calculateDateTime = (offset) => {
        //if(savedDate === null) return ""; 

        // get current local time in milliseconds
        let date = new Date();
        let localTime = date.getTime();

        // get local timezone offset and convert to milliseconds    
        let localOffset = date.getTimezoneOffset() * 60000;  

        // obtain the UTC time in milliseconds
        let utc = localTime + localOffset; 
        let newDateTime = utc + (28800000 * offset); //Malaysia is +8 hours 
        let convertedDateTime = new Date(newDateTime);
        return convertedDateTime.toLocaleString();
        console.log(calculateDateTime)

    }
 */


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
            return res.json();
          })
          .then(res => {
            setEvent(res);
            console.log("Event Deleted");
          })
          .catch(err => {
            console.error(err.message);
          });
      };

  
  return (
    <div>
    <h3>EVENT LISTING</h3>
    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="customized table">
        <TableHead>
            <TableRow>
                <TableCell>DATE</TableCell>
                <TableCell>EVENT</TableCell>
                <TableCell>LOCATION</TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
          {event.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{moment(item.date).format('LL')}</TableCell>
                <TableCell>{item.eventName}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                <DeleteIcon 
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
        </TableBody>
      </Table>
    </TableContainer>

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
          &nbsp;
          
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
          &nbsp;

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
          > SUBMIT
          </Button>
        </form>
      </div>

    
    </div>
  )
}

export default Event;
