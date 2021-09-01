import React, { useEffect, useState } from 'react';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const Song = (props) => {
  let [song, setSong] = useState([]);
  let [input, setInput] = useState({});

  const useStyles = makeStyles({
    table: {
      minWidth: 800,
      backgroundColor: "#F4ECF7",
    },
  });

  const classes = useStyles();

  useEffect(() => {
      getSong();
  }, []);

  const getSong = () => {
    fetch("/song")
        .then(response => response.json())
        .then(song => {
            console.log(song);
            setSong(song);
        })
        .catch(error => {
            console.log("Error");
        });
  };

  const handleChange = e => {
    //console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    addSong();
    return false;
  };

  const handleRemove = (e, id) => {
    console.log(id);
    deleteSong(id);
  };

  const addSong = () => {
    fetch("/song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
      .then(res => {
        return res.json();
        //console.log(res.json());
        //

      })
      .then(data => {
        //setStudents(data);
      //  getSong();
        setSong(data);
        console.log("New Song Added", data);
        props.updateEvent();

      })
      .catch(err => {
        console.error("Error", err);
      });
  };


  const deleteSong = id => {
    //console.log("in Fetch", id); //to check if it's passing through
    fetch(`/song/${id}`, {
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
        setSong(res);
        //props.updateEvent();
        console.log("Song Deleted");
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  return (
  <div>

<h3>ADD NEW SONG</h3>
    <div className="bg-success p-2 text-white bg-opacity-10">
        <form>
          
          {/* <label htmlFor="title" className="form-label">
            Song Title:
          </label> */}
          <TextField
            label="Song Title"
            name="title"
            id="title"
            type="text"
            // value={input.title}
            onChange={e => handleChange(e)}
          />{" "}
          &nbsp;
          
          {/* <label htmlFor="composer" className="form-label">
            Composer:
          </label> */}
          <TextField
            label="Composer"
            name="composer"
            id="composer"
            type="text"
            //value={input.composer}
            onChange={e => handleChange(e)}
          />{" "}
          &nbsp; &nbsp;

          {/* <label htmlFor="composer" className="form-label">
            Parts:
          </label> */}
          <TextField
            label="Parts"
            name="parts"
            id="parts"
            type="text"
            //value={input.parts}
            onChange={e => handleChange(e)}
          />{" "}
          &nbsp; &nbsp;

          <Button onClick ={(e) => handleSubmit(e)}
            variant="outlined"
            type="submit"
            className="btn btn-outline-light"
            value="submit"
          > ADD SONG
          </Button>
        </form>
      </div>

    <h3>SONG LIST</h3>
    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="customized table">
        <TableHead>
            <TableRow>
                <TableCell><h4>TITLE</h4></TableCell>
                <TableCell><h4>COMPOSER</h4></TableCell>
                <TableCell><h4>PARTS</h4></TableCell>
            </TableRow>
        </TableHead>

    <TableBody>   
    {song.map(item => {
      return (
        <TableRow key={item.id}>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.composer}</TableCell>
          <TableCell>{item.parts}</TableCell>
          <TableCell>
            <DeleteIcon
              color="primary"
              style={{cursor:'pointer'}}
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

  </div>
  )
  
}

export default Song;