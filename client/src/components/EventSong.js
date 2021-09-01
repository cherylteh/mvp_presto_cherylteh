import React, {useEffect, useState} from 'react'


export const eventSong = () => {
    let [song, setSong] = useState([]);
    let [input, setInput] = useState({});
  

    useEffect(() => {
        getEventSong();
    }, []);

    const getEventSong = () => {
        fetch("/eventsong")
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
          })
          .then(data => {
            //setStudents(data);
            getSong();
            console.log("New Song Added", data);
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
              <form onSubmit={e => handleSubmit(e)}>
                
                {/* <label htmlFor="title" className="form-label">
                  Song Title:
                </label> */}
                <TextField
                  label="Song ID"
                  name="title"
                  id="title"
                  type="text"
                  // value={input.title}
                  onChange={e => handleChange(e)}
                />{" "}
                &nbsp;
      
                <Button
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
                      <TableCell><h4>EVENT</h4></TableCell>
                      <TableCell><h4>SONGS</h4></TableCell>
                  </TableRow>
              </TableHead>
      
          <TableBody>   
          {eventsong.map(item => {
            return (
              <TableRow key={item.eventID}>
                <TableCell>{item.songID}</TableCell>
                <TableCell>
                  <DeleteIcon
                    Color="secondary"
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

export default EventSong;
