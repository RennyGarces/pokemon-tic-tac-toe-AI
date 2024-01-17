import {PokemonBattle} from "./pokemonBattle";
import {useRef, useState} from "react";
import ashImage from '../images/ash.png';
import mystyImage from '../images/mysty.jpg';
import musicBattle from '../music/Opening.mp3';
import buttonCLick from '../music/buttonClick.mp3';
import errorClick from '../music/error.wav';
export default function App() {

  return (
     <div>
      <StartGame/>
     
     </div>
  
  );
}

function StartGame (){
  const [userAvatar, setUserAvatar] = useState(null);
 

return(
  <div>
    
 <div className={userAvatar?"hidden":""}>   
 <ImputFromUser onUserAvatar={setUserAvatar} />
 </div>
 {userAvatar &&<> <h1>Hi {userAvatar.trainer} wellcome to the Pokemon tic tac toe</h1>
 <audio controls src={musicBattle} autoPlay loop />
 <PokemonBattle userAvatar={userAvatar}/>
 </>}
</div>
)
}

function ImputFromUser({onUserAvatar}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(""); 
  const [error, setError] = useState(false);
 function handleName(e){
  const regex = /^[a-zA-Z]{0,10}$/;
  if ( regex.test(e)) {
    setName(e.toLocaleLowerCase());
  }
  }
const button = useRef();
 function handleSubmit(e){
 button.current.play();
   
  e.preventDefault();
   if (name ==="" || avatar ===""){ 
    setError(true);
    return};
    setError(false);
   const userAvatar =[{
    trainer: name,
    trainerPicture: avatar
  }]
  
  onUserAvatar(userAvatar);
  setName("");
  setAvatar("");

}
  return (
    <div>
      <h1>Choose your trainer</h1>
     
      <form onSubmit={handleSubmit}>
      {!error &&<audio ref={button} src={buttonCLick} />}
      {error &&<audio ref={button} src={errorClick} />}
        <label>
          Name:
          <input type="text" value={name} onChange={(e)=> handleName(e.target.value)} />
        </label>
         <div>
          <img src={ashImage} value={avatar} onClick={(e)=> setAvatar(ashImage)}  alt="ASH"/>
          <img src={mystyImage} value={avatar} onClick={(e)=> setAvatar(mystyImage)}  alt="MYSTY"/>
         </div>
        <input type="submit" value="acept" />
      </form>
      {error ? <p>Type your trainer name and select your Avatar</p>:""}
     
    </div>
  )
}