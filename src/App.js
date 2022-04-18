import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import CreatePlaylist from './components/createPlaylist';
import { useSelector } from 'react-redux';

const CLIENT_ID = "64df437743794f03b6582c3afeb0cec6"
const REDIRECT_URI = "http://localhost:3000/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"
const scopes = 'user-read-private user-read-email playlist-modify-private playlist-read-private playlist-modify-public playlist-read-collaborative user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read user-follow-read user-follow-modify user-library-read user-library-modify';

const App = () => {

  const [search, setSearch] = useState("");
  const [selectedSong, setSelectedSong] = useState([]);
  const [accessToken, setAccessToken] = useState("")
  const [data, setData] = useState([])
  const userToken = useSelector(state => state)
    console.log(userToken)

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  // const handleSelectedSong=(event)=>{
  //   setSelectedSong([...selected],uri)
  // }
  // const handleDeselectedSong=(event)=>{
  //   setSelectedSong(selected.filter((item)))
  // }

  const getSpotify = () => {
    fetch('https://api.spotify.com/v1/search?q=' + search + '&type=track&limit=10&access_token=' + accessToken + '&scope='+scopes)


      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data.tracks.items)
      });
  }

  useEffect(() => {
    setAccessToken(window.location.hash
      .substring(1, window.location.hash.length - 1)
      .split("&")[0]
      .split("=")[1])
  }, [])
  console.log(selectedSong)

  return (
    <div className="App">
      <CreatePlaylist accessToken={accessToken} selected={selectedSong}/>
      <header className="Apps-Header">
        <h1>Qillin</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}>Login to Spotify</a>
        <input value={search} onChange={handleChange}></input>
        <button onClick={getSpotify}>search</button>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Song image</th>
              <th>Song</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>

                <td>{index + 1}</td>
                <td>
                  <img src={item.album.images[2].url}></img>
                </td>
                <td>{item.name}</td>
                <td>{item.artists[0].name}</td>
                <td>{item.album.name}</td>

                <td>
                  {selectedSong.includes(item.uri) ?
                    <button onClick={() => setSelectedSong(selectedSong.filter(uri => uri !== item.uri))}>Deselect</button> 
                    :
                    <button onClick={() => setSelectedSong([...selectedSong, item.uri])}>Select</button>
                    }
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </header>

    </div>
  );
}


export default App;