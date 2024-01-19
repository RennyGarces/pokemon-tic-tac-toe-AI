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
      const pokemonLooser = pokemonRender.filter((e) => e.name === pokemonUser[0]);
      setPokemonRender(pokemonLooser);
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
    <div   >
   <Trainer pokemonRenderCpu={userAvatar} />  
      <PokemonComponent 
       pokemonName={pokemonUser}
        onGetPokemon={handlePokemonRender}
      />
      <ChoosePokemon
      onClick={handleClick}
       status={statusGame}
        onPokemon={handlePokemonUser}
        listPokemonUser={pokemonRender}
        pokemonComputer={pokemonComputer}
        nextPokemon={nextPokemon}
        cleanBoard={handleCleanBoard}
      />
    
      <div className={`containerBattle  ${!loading?`loading`:""}`} >
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
      </div>
      <CleanBoard 
      loading={loading}
        onClick={handleClick}
        cleanBoard={handleCleanBoard}
        status={statusGame}
        nextPokemon={nextPokemon}
      />
    
      
      <PokemonInput 
      status={statusGame}
      square={square}
       onLoading={handleClick}
        onPokemon={handlePokemonComputer}
        cleanBoard={handleCleanBoard}
      />
     <Trainer pokemonRenderCpu={pokemonRenderCpu} />
      <PokemonComponent 
        reset={resetGame}
        pokemonName={pokemonComputer}
        onGetPokemon={handlePokemonRender}
      />
   
      <HardReset onHardReset={hardResetGame}  />
    </div>
  );
}


function Trainer ({pokemonRenderCpu}) {
  const avatar = pokemonRenderCpu[0]?.trainerPicture;
  const name  = pokemonRenderCpu[0]?.trainer;
  return (
    <div>
      <img src={avatar} alt={name}></img>
      <p> {name} </p>
 {pokemonRenderCpu[0]?.trainerLocation && <p>Location: {pokemonRenderCpu[0]?.trainerLocation}</p>}
    </div>
  )
}
/* get pokemon from the input field */
function PokemonInput({ onPokemon, cleanBoard,status,square }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  function handlePokemon(e) {
    e.preventDefault();
    const regex = /^[a-zA-Z]{3,10}$/;
    if (input && regex.test(input)) {
      onPokemon(input.toLocaleLowerCase());
      setError(false);
      setInput("");
      cleanBoard();       
    } else {
      setError(true);
      setInput("");
      
     
    }
   
  }

  return (
    <div>
      {square.every((el)=>el===null) || status !== null ? (
      <>
      <form onSubmit={handlePokemon}>
        <input name="pokemonInpu" className="form-control form-control-sm"
          type="text"
          value={input}
          placeholder="Search fot other Pokemon"
          onChange={(e) => setInput(e.target.value)}
        ></input>
      </form>
    {error ? <p>Please type your pockemon again</p> : ""}
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
  

  return (
    <div>
       {status === "X" && < button onClick={catchPokemon} value={pokemonComputer[0]} className="btn btn-primary">catch your new pokemon {pokemonComputer[0]}</button>}
    <div>
      {listPokemonUser.length > 0 &&
        listPokemonUser.map((el) => (
          <div key={el.id}>
            <button onClick={clickPokemon} value={el.name} className="btn btn-primary" >
              {el.name}
            </button>
          </div>
        ))}
    </div>
    </div>
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
    <>
      {status === "X" && (
        <button onClick={() => nextPokemonComputerAndClean()} className="btn btn-primary" >
         Next Oponent
        </button>
        
      )}
         {status === "O" && (
        <>
       {loading&& <button  onClick={() => nextPokemonComputerAndClean()} className="btn btn-primary" >next Pokemon</button>
             }      
  <button onClick={()=>cleanTheBoard()} className="btn btn-primary" >
          {`Clean the Board`}
        </button>
        </>
      )}
       {status === false && (
        <>
        <button onClick={() => cleanTheBoard()} className="btn btn-primary" >
         Draw try Again
        </button>
        <button onClick={() => nextPokemonComputerAndClean()} className="btn btn-primary">
         Next Oponent
        </button>
        </>
      )}
      
  </>
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
    <div>
      <button onClick={handleReset} className="btn btn-primary" > Restart the Game</button>
      <a href="https://pokemondb.net/pokedex/national#gen-9" rel="noreferrer" target="_blank" >List of all porkemons</a> 
  
        </div>
  );
}

