import React, { useEffect, useState } from 'react'

export const Song = () => {
  let [song, setSong] = useState([]);
  let [input, setInput] = useState({});

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
     <h3>SONG LIST</h3>
 
  <div> 
    {song.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>{item.composer}</td>
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

  <h3>ADD NEW SONG</h3>
    <div className="bg-success p-2 text-white bg-opacity-10">
        <form onSubmit={e => handleSubmit(e)}>
          
          <label htmlFor="title" className="form-label">
            Song Title:
          </label>
          <input
            name="title"
            id="title"
            type="text"
            // value={input.title}
            onChange={e => handleChange(e)}
          ></input>{" "}
          &nbsp;
          
          <label htmlFor="composer" className="form-label">
            Composer:
          </label>
          <input
            name="composer"
            id="composer"
            type="text"
            //value={input.composer}
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

  </div>
  )
}

export default Song;