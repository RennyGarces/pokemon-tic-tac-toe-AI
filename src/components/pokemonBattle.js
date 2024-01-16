import { useState } from "react";
import { PokemonComponent, PokemonsRandorComputer } from "./controler";
import Tictactoe from "./tic-tac-toe";
export function PokemonBattle() {
  const [pokemonUser, setPokemonUser] = useState(["pikachu", "user"]);
  const [pokemonComputer, setPokemonComputer] = useState(["charmander", "cpu"]);
  const [pokemonRender, setPokemonRender] = useState([]);
  const [pokemonRenderCpu, setPokemonRenderCpu] = useState([]);
  const [statusGame, setStatusGame] = useState(null);
  const [square, setSquares] = useState(Array(9).fill(null));
  const [imageSquare, setImageSquare] = useState(Array(9).fill(null));
 const [loading, setLoading] = useState(false);
  /* loading screen */
 let loadingCompleted = () => {
    return new Promise(resolve => {
      if (pokemonRenderCpu[0]?.name === pokemonComputer[0]) {
        setTimeout(() => resolve(true), 3000);
      } else {
        resolve(false);
      }
    });
  }

loadingCompleted().then((res) => {
  if(res) setLoading(true);
})

/* each time the user hit buttons */
function handleClick() {
  setLoading(false);

}

/* normal functions */

  function defineStatusGame(status) {
    setStatusGame(status);
  }
  function handlePokemonRender(newPokemon) {
    const pokemonCpu = newPokemon.find((e) => e.owner === "cpu");
    pokemonCpu &&setPokemonRenderCpu([pokemonCpu])

const pokemonUser = newPokemon.find((e) => e.owner === "user");

pokemonUser && setPokemonRender((p) => {
  const isPokemonUserAlreadyInArray = p.some(existingPokemon => existingPokemon.id === pokemonUser.id);
  
  if (!isPokemonUserAlreadyInArray) {
    return [...p, pokemonUser];
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
    <div className={`containerBattle  ${!loading&& `loading`}`}>
      
      
      
      <ChoosePokemon
      onClick={handleClick}
       status={statusGame}
        onPokemon={handlePokemonUser}
        listPokemonUser={pokemonRender}
        pokemonComputer={pokemonComputer}
        nextPokemon={nextPokemon}
        cleanBoard={handleCleanBoard}
      />
      <PokemonComponent 
       
        pokemonName={pokemonUser}
        onGetPokemon={handlePokemonRender}
      />
      <Tictactoe
        square={square}
        setSquares={setSquares}
        imageSquare={imageSquare}
        setImageSquare={setImageSquare}
        onStatus={defineStatusGame}
        nameOponent={pokemonComputer[0]}
        nameUser={pokemonUser[0]}
        onPokemonRender={pokemonRender}
        onPokemonRenderCpu={pokemonRenderCpu}
      />
      <CleanBoard 
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
  
      <PokemonComponent 
        reset={resetGame}
        pokemonName={pokemonComputer}
        onGetPokemon={handlePokemonRender}
      />
      <Trainer pokemonRenderCpu={pokemonRenderCpu} />
      <HardReset onHardReset={hardResetGame}  />
    </div>
  );
}


function Trainer ({pokemonRenderCpu}) {
  const avatar = pokemonRenderCpu[0]?.trainerCpuPicture;
  const name  = pokemonRenderCpu[0]?.trainerCpu;
 const location = pokemonRenderCpu[0]?.trainerCpuLocation;
  return (
    <div>
      <img src={avatar} alt={name}></img>
      <p>Trainer: {name} </p>
      <p>Location: {location}</p>
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
      {square.every((el)=>el===null) || status !== null?
      <>
      <form onSubmit={handlePokemon}>
        <p>Search for a Pokemon</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
      </form>
    {error ? <p>Please type your pockemon again</p> : ""}
    </>:""}
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
       {status === "X" && < button onClick={catchPokemon} value={pokemonComputer[0]}>catch your new pokemon {pokemonComputer[0]}</button>}
    <div>
      {listPokemonUser.length > 0 &&
        listPokemonUser.map((el) => (
          <div key={el.id}>
            <button onClick={clickPokemon} value={el.name}>
              {el.name}
            </button>
          </div>
        ))}
    </div>
    </div>
  );
}

function CleanBoard({ cleanBoard, status, nextPokemon,onClick }) {

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
        <button onClick={() => nextPokemonComputerAndClean()}>
         Next Oponent
        </button>
        
      )}
         {status === "O" && (
        <>
        <button onClick={() => nextPokemonComputerAndClean()}>next Pokemon</button>
        <button onClick={()=>cleanTheBoard()}>
          {`Clean the Board`}
        </button>
        </>
      )}
       {status === false && (
        <button onClick={() => cleanTheBoard()}>
         Draw try Again
        </button>
        
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
    <>
      <button onClick={handleReset}> Restart the Game</button>
    </>
  );
}

