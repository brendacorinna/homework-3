import axios from 'axios'
import {useState, useEffect} from 'react'
const CreatePlaylist =( {accessToken,selected} )=>{

const [playlist ,setPlaylist]= useState({
    namePlaylist:"",
    descriptionPlaylist:"",
});
const [hasError, setError]=useState(false)
const [playlist_id ,setPlaylist_id] = useState("")

useEffect(()=>{
    console.log(accessToken)
},[])
const postData = async () => {
    await axios
      .post(
        "https://api.spotify.com/v1/users/brendacorinna7/playlists",

        {
          name: playlist.namePlaylist,
          description: playlist.descriptionPlaylist,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPlaylist_id(res.data.id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addSong = () => {
    axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        {
          uris: selected,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    addSong();
  }, [playlist_id]);
const handleChange=(event)=>{
    const { name, value}= event.target;
    setPlaylist({
        ...playlist,
        [name]:value,
    });

    const errors = {...playlist}
    if(playlist.namePlaylist.length <=10){
        setError({
            ...errors,
            namePlaylist :"minimum 10 character",
        })
    }else{
        setError({
            ...errors,
            namePlaylist:"",
        })
    }

console.log(playlist)
}
const handleOnSubmit =(event)=>{
    event.preventDefault();
    if (playlist.namePlaylist.length <= 10){
        return alert("Minimum 10 characters")
    }else{
        postData()
        return alert("Playlist created");
    }
  
}


return(
    <>
    <form onSubmit={handleOnSubmit}>
        <label htmlFor="">Title</label>
        <input required name="namePlaylist" type="text" value={playlist.namePlaylist} onChange={handleChange} />
        <label htmlFor="">Description</label>
        <input required name="descriptionPlaylist" type="text" value={playlist.descriptionPlaylist} onChange={handleChange} />
        {hasError.namePlaylist && (
                      <p className="error">{hasError.namePlaylist}</p>
                    )}
        <button type="submit">create playlist</button>
    </form>
    </>
)
}
export default CreatePlaylist;