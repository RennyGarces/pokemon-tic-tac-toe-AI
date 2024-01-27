import { useState } from "react";
import { PokemonComponent, PokemonsRandorComputer } from "./controler";
import Tictactoe from "./tic-tac-toe";
import ashImage from '../images/ash.png';
import mystyImage from '../images/mysty.jpg';
import brockImage from '../images/brock.png';
import garyImage from '../images/gary.png';
import serenaImage from '../images/serena.png';
import mayImage from '../images/may.png';
import professorImage from '../images/professor.png';
import irisImage from '../images/iris.png';
import { useEffect } from "react";
export function PokemonBattle({userAvatar}) {
  const [pokemonUser, setPokemonUser] = useState(userAvatar[0].pokemons[0]);
  const [pokemonComputer, setPokemonComputer] = useState(userAvatar[0].pokemons[1]);
  const [pokemonRender, setPokemonRender] = useState([]);
  const [pokemonRenderCpu, setPokemonRenderCpu] = useState([]);
  const [statusGame, setStatusGame] = useState(null);
  const [square, setSquares] = useState(Array(9).fill(null));
  const [imageSquare, setImageSquare] = useState(Array(9).fill(null));
 const [loading, setLoading] = useState(false);
 /* loading screen */
 let loadingCompleted = () => {
    return new Promise(resolve => {
      if (pokemonRenderCpu[0]?.name === pokemonComputer[0]&& !loading) {
        setTimeout(() => resolve(true), 4000);
      } else {
        resolve(false);
      }
    });
  }

/* each time the user hit buttons */
function handleClick() {
  setLoading(false);
  
}
loadingCompleted().then((res) => {
  if(res) setLoading(true);
})

/* normal functions */

function defineStatusGame(status) {
    setStatusGame(status);
    if(status === "O" && pokemonRender.length > 1) {

      const updatePokemons = pokemonRender.filter((e) => e.name === pokemonUser[0]);
     setPokemonRender(updatePokemons);
      
    }
    }
function handlePokemonRender(newPokemon) {
    const pokemonCpu = newPokemon.find((e) => e.owner === "cpu");
    pokemonCpu &&setPokemonRenderCpu([pokemonCpu])

const pokemonUserFilter = newPokemon.find((e) => e.owner === "user");
pokemonUserFilter && setPokemonRender((p) => {
  const isPokemonUserAlreadyInArray = p.some(existingPokemon => existingPokemon.id === pokemonUserFilter.id);
  
  if (!isPokemonUserAlreadyInArray) {
    return [...p, pokemonUserFilter];
  }

  return p;
});


}
function handlePokemonUser(name) {
   
    setPokemonUser(name);
    
  }
  function handlePokemonComputer(name) {
  
    setPokemonComputer([name, "cpu"]);
  }
  function nextPokemon() {

    if (statusGame !== null) PokemonsRandorComputer(handlePokemonComputer, 905);
  }

  function handleCleanBoard() {
    const arr = Array(9).fill(null);
    
    setSquares(arr);
    setImageSquare(arr);
  }
  function resetGame() {
    const arr = Array(9).fill(null);
    setSquares(arr);
    setImageSquare(arr);
    setPokemonComputer(PokemonsRandorComputer(handlePokemonComputer, 905));
    handleClick();
    console.clear();
  }
  function hardResetGame() {
    window.location.reload();
  }
  return (
  <div className="container_game">   
  
  <div className="principal_buttons">
  <HardReset onHardReset={hardResetGame}  />
    
     <PokemonInput 
      status={statusGame}
      square={square}
       onLoading={handleClick}
        onPokemon={handlePokemonComputer}
        cleanBoard={handleCleanBoard}
      />   

       <CleanBoard 
      loading={loading}
        onClick={handleClick}
        cleanBoard={handleCleanBoard}
        status={statusGame}
        nextPokemon={nextPokemon}
      /> 
    


   </div>
   <div className={`containerBattle  ${!loading?`loading`:""}`} >
    <div className="user__column">
    
         <ChoosePokemon 
              onClick={handleClick}
              status={statusGame}
                onPokemon={handlePokemonUser}
               listPokemonUser={pokemonRender}
                 pokemonComputer={pokemonComputer}
                nextPokemon={nextPokemon}
                cleanBoard={handleCleanBoard}
              />
      <Trainer pokemonRender={userAvatar} />      
           <PokemonComponent 
              pokemonName={pokemonUser}
               onGetPokemon={handlePokemonRender}
               />
      
     </div>
         <Tictactoe 
        square={square}
        setSquares={setSquares}
        imageSquare={imageSquare}
        setImageSquare={setImageSquare }
        onStatus={defineStatusGame}
        nameOponent={pokemonComputer[0]}
        nameUser={pokemonUser[0]}
        onPokemonRender={pokemonRender}
        onPokemonRenderCpu={pokemonRenderCpu}
      />
    
        <div className="cards">
              <Trainer pokemonRender={pokemonRenderCpu} />  
               <PokemonComponent 
                reset={resetGame}
                pokemonName={pokemonComputer}
            onGetPokemon={handlePokemonRender}
            /> 


         </div>
        
    </div>
   
   </div>
  );
}


function Trainer ({pokemonRender}) {
  const avatar = pokemonRender[0]?.trainerPicture;
  const name  = pokemonRender[0]?.trainer;
  return (
    <div className="cards_battle_avatar">
      <img src={avatar} alt={name}></img>
      <p> {name} </p>
 {pokemonRender[0]?.trainerLocation ? <p>From {pokemonRender[0]?.trainerLocation}</p>:<p>Pallet Town</p>}
    </div>
  )
}
/* get pokemon from the input field */
function PokemonInput({ onPokemon, cleanBoard,status,square }) {
  const [input, setInput] = useState("");
  
  function handlePokemon(e) {
    e.preventDefault();
    const regex = /^[a-zA-Z]{3,10}$/;
    if (input && regex.test(input)) {
      onPokemon(input.toLocaleLowerCase());
      setInput("");
      cleanBoard();
     
    }
    else {
    setInput("");
        
    }
   
  }
  return (
    <div >
      {square.every((el)=>el===null) || status !== null ? (
      <>
      <form onSubmit={handlePokemon} className="pokemon_input" >
        <input name="pokemonInpu" 
      
          type="text"
          value={input}
          placeholder="Search fot other Pokemon"
          onChange={(e) => setInput(e.target.value)}
        ></input>
      </form>
    </>
    ):""}  
    </div>
  );
}
/* ======================================================= */
/* user's Pokemon */
function ChoosePokemon({nextPokemon,cleanBoard, onPokemon, listPokemonUser,status,pokemonComputer,onClick}) {

 function catchPokemon(e){   
    e.preventDefault();
    onPokemon([e.target.value,"user"]);
    cleanBoard();
    nextPokemon();
    onClick(true);
   
  }

  function clickPokemon(e) {
    e.preventDefault();
    onPokemon([e.target.value,"user"]);
  
  }
  
function loosePokemon(){
  cleanBoard();
  nextPokemon();
  onClick(true);
}
function reloadPokemon(){
  cleanBoard();
  onClick(true);
}


  return (
    <>
      {status === "X" && <  button onClick={catchPokemon} value={pokemonComputer[0]}  className="catch_pokemon">touch here to catch {pokemonComputer[0]}</button>}
      {status === "O" && <button onClick={loosePokemon} className="catch_pokemon">Sorry you lost try again!</button>}
      {status === false && <button onClick={reloadPokemon} className="catch_pokemon">Draw no one won try again!</button>}
       
     <div className="pokemon_list">
      {listPokemonUser.length > 0 &&
        listPokemonUser.map((el) => (
          <div key={el.id}  className="pokemon_list_item">
          <img src={el.images.front_default} alt={el.name} />
          <button onClick={clickPokemon} value={el.name} >
              {el.name}
            </button>
          </div>
        ))}
    </div>
    </>
  );
}

function CleanBoard({ cleanBoard, status, nextPokemon,onClick ,loading}) {
  
  function cleanTheBoard() {
    cleanBoard();
    onClick(true);
  }

  function nextPokemonComputerAndClean() {
    cleanBoard();
    nextPokemon();
    onClick(true);
  
  }
  return (
    <div className="principal_buttons_dinamic">
      {status === "X" && (
        <button onClick={() => nextPokemonComputerAndClean()}  >
         Next Oponent
        </button>
        
      )}
         {status === "O" && (
        <>
       {loading&& <button  onClick={() => nextPokemonComputerAndClean()} >Next Pokemon</button>
             }      
  <button onClick={()=>cleanTheBoard()} >
          {`Clean the Board`}
        </button>
        </>
      )}
       {status === false && (
        <>
        <button onClick={() => cleanTheBoard()}  >
         Draw try Again
        </button>
        <button onClick={() => nextPokemonComputerAndClean()} >
         Next Oponent
        </button>
        </>
      )}
      
  </div>
  );
}

function HardReset({ onHardReset }) {
  const handleReset = () => {
    if (
      window.confirm(
        `are you sure to reset the game? all your pokemon will lose`
      )
    ) {
      onHardReset();
    }
  };

  return (
    <div className="principal_buttons_restart">
      <button onClick={handleReset}  > Restart the Game</button>
     </div>
  );
}

