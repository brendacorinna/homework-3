import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import { Component } from 'react';

const CLIENT_ID = "64df437743794f03b6582c3afeb0cec6"
const REDIRECT_URI = "http://localhost:3000/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

class App extends Component {
  state={
    search:"",
    data:[],
    accessToken: window.location.hash
    .substring(1, window.location.hash.length -1)
    .split("&")[0]
    .split("=")[1]
  }

  getSpotify=()=>{
    fetch('https://api.spotify.com/v1/search?q=' + this.state.search + '&type=track&limit=10&access_token=' + this.state.accessToken)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        this.setState({
            data: data.tracks.items,
        })
    })
  }

  handleChange=(event)=>{
    this.setState({
      search:event.target.value
    })
  }

render() {
  return ( 
      <div className="App">
        <header className="Apps-Header">
        <h1>Cille</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
          <input value={this.state.search} onChange={this.handleChange}></input>
          <button onClick={this.getSpotify}>search</button>
          <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Song image</th>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Album</th>
                </tr>
            </thead>
          <tbody>
              {this.state.data.map((item, index)=>(
              <tr>
            
                <td>{index + 1}</td>
                  <td>
                  <img src={item.album.images[2].url}></img>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.artists[0].name}</td>
                  <td>{item.album.name}</td>
            
            </tr>
            ))}
           
          </tbody>

          </table>

        </header>

      </div>
    );
  }
 
}

export default App;