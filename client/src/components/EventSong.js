import React from 'react'
import { connect } from 'react-redux'

export const eventSong = () => {
    let [song, setSong] = useState([]);
    let [input, setInput] = useState({});
  

const mapStateToProps = (state) => ({
    
})

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

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSong)
