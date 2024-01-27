import {PokemonBattle} from "./pokemonBattle";
import {useRef, useState} from "react";
import ashImage from '../images/ash.png';
import mystyImage from '../images/mysty.jpg';
import pokemonBall from '../images/Pokeball_icon.png';
import brockImage from '../images/brock.png';
import garyImage from '../images/gary.png';
import serenaImage from '../images/serena.png';
import mayImage from '../images/may.png';
import professorImage from '../images/professor.png';
import irisImage from '../images/iris.png';
import gohImage from '../images/goh.jpg';
import musicBattle from '../music/Opening.mp3';
import buttonCLick from '../music/buttonClick.mp3';
import errorClick from '../music/error.wav';

export default function App() {

  return (
     <div >   
      <StartGame/>
     </div>
  
  );
}



function StartGame (){
  const [userAvatar, setUserAvatar] = useState(null);
 

return(
  <>  
 <div className={userAvatar?"hidden":""}>   
 <ImputFromUser onUserAvatar={setUserAvatar} />
 </div>
 {userAvatar &&<>
 <div className="audio"> 
 <audio controls src={musicBattle} autoPlay loop />
 </div>
 <PokemonBattle userAvatar={userAvatar}/>
 </>}
</>
)
}

function ImputFromUser({onUserAvatar}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(""); 
  const [pokemon, setPokemon] = useState("");
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
    trainerPicture: avatar,
    pokemons: pokemon
  }]
  
  onUserAvatar(userAvatar);
  setName("");
  setAvatar("");
  setPokemon("");

}
  return (
    <div>
      {!error &&<audio ref={button} src={buttonCLick} />}
      {error &&<audio ref={button} src={errorClick} />}
      
      <form onSubmit={handleSubmit}>    
         <div>
         <h3>Choose your Avatar</h3>
          <img className={`avatarImage ${ avatar === ashImage? `selected`:""}`} src={ashImage} value={avatar} onClick={(e)=> {setAvatar(ashImage);setPokemon(pokemons.ash)}}  alt="ASH"/>
          <img className={`avatarImage ${ avatar === mystyImage? `selected`:""}`} src={mystyImage} value={avatar} onClick={(e)=> {setAvatar(mystyImage);setPokemon(pokemons.mysty)}}  alt="MYSTY"/>
          <img className={`avatarImage ${ avatar === brockImage? `selected`:""}`} src={brockImage} onClick={(e)=>{ setAvatar(brockImage);setPokemon(pokemons.brock)}}  alt="BROCK"/>
          <img className={`avatarImage ${ avatar === garyImage? `selected`:""}`} src={garyImage}  onClick={(e)=> {setAvatar(garyImage);setPokemon(pokemons.gary)}}  alt="GARY"/>
          <img className={`avatarImage ${ avatar === serenaImage? `selected`:""}`} src={serenaImage} onClick={(e)=>{ setAvatar(serenaImage);setPokemon(pokemons.serena)}}  alt="SERENA"/>
          <img className={`avatarImage ${ avatar === mayImage? `selected`:""}`} src={mayImage}  onClick={(e)=> {setAvatar(mayImage); setPokemon(pokemons.may)}}  alt="MAY"/>
          <img className={`avatarImage ${ avatar === professorImage? `selected`:""}`} src={professorImage} onClick={(e)=>{ setAvatar(professorImage);setPokemon(pokemons.professor)}}  alt="PROFESSOR"/>
        <img className={`avatarImage ${ avatar === irisImage? `selected`:""}`} src={irisImage} onClick={(e)=>{ setAvatar(irisImage);setPokemon(pokemons.iris)}}  alt="IRIS"/>
        <img className={`avatarImage ${ avatar === gohImage? `selected`:""}`} src={gohImage} onClick={(e)=>{ setAvatar(gohImage);setPokemon(pokemons.goh)}}  alt="GOH"/>
         </div>
         <label>
        <h3>Type your name</h3>
          <input name="trainerName" type="text" value={name} onChange={(e)=> handleName(e.target.value)} />
        </label>
        <input type="submit" value="Enter" />
      </form>
      {error ? <p>Type your trainer name and select your Avatar</p>:""}
     
    </div>
  )
}

const pokemons = {
  ash: [["pikachu", "user"], ["charmander", "cpu"]],
  mysty: [["horsea", "user"], ["bulbasaur", "cpu"]],
  brock: [["onix", "user"], ["geodude", "cpu"]],
  gary: [["krabby", "user"], ["nidoqueen", "cpu"]],
  serena: [["fennekin", "user"], ["froakie", "cpu"]],
  may: [["torchic", "user"], ["mudkip", "cpu"]],
  professor:[[ "bulbasaur", "user"], ["squirtle", "cpu"]],
  iris: [["gible", "user"], ["drilbur", "cpu"]],
  goh: [["cinderace", "user"], ["sobble", "cpu"]]

};