import { useState } from "react";
import { PokemonComponent, PokemonsRandorComputer } from "./controler";
import Tictactoe from "./tic-tac-toe";


export function PokemonBattle() {
  const [pokemonUser, setPokemonUser] = useState(["paras", "user"]);
  const [pokemonComputer, setPokemonComputer] = useState(["charmander", "cpu"]);
  const [pokemonRender, setPokemonRender] = useState([]);
  const [pokemonRenderCpu, setPokemonRenderCpu] = useState([]);
  const [statusGame, setStatusGame] = useState(null);
  const [square, setSquares] = useState(Array(9).fill(null));
  const [imageSquare, setImageSquare] = useState(Array(9).fill(null));

  function defineStatusGame(status) {
    setStatusGame(status);
  }
  function handlePokemonRender(newPokemon) {
    const pokemonCpu = newPokemon.find((e) => e.owner === "cpu");
    pokemonCpu &&setPokemonRenderCpu([pokemonCpu])

/* ============================================= */
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
    if (statusGame === "X") PokemonsRandorComputer(handlePokemonComputer, 905);
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
  }
  function hardResetGame() {
    window.location.reload();
  }
  return (
    <div className="container">
      <ChoosePokemon
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
        cleanBoard={handleCleanBoard}
        status={statusGame}
        nextPokemon={nextPokemon}
      />
      <PokemonInput
        onPokemon={handlePokemonComputer}
        cleanBoard={handleCleanBoard}
      />

      <PokemonComponent
        reset={resetGame}
        pokemonName={pokemonComputer}
        onGetPokemon={handlePokemonRender}
      />
      <HardReset onHardReset={hardResetGame} />
    </div>
  );
}

/* get pokemon from the input field */
function PokemonInput({ onPokemon, cleanBoard }) {
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
      <form onSubmit={handlePokemon}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
      </form>
      {error ? <p>Please type your pockemon again</p> : ""}
    </div>
  );
}
/* ======================================================= */
/* user's Pokemon */
function ChoosePokemon({nextPokemon,cleanBoard, onPokemon, listPokemonUser,status,pokemonComputer}) {
 
  function printPokemonCard(name) {}
 

  function catchPokemon(e){   
    e.preventDefault();
    onPokemon([e.target.value,"user"]);
    cleanBoard();
    nextPokemon();
  }

  function clickPokemon(e) {
    e.preventDefault();
    onPokemon([e.target.value,"user"]);
  
  }
  

  return (
    <div>
       {status === "X" && <> < button onClick={catchPokemon} value={pokemonComputer[0]}>catch your new pokemon {pokemonComputer[0]}</button>
    
      < button onClick={()=>printPokemonCard(pokemonComputer[0])} value={pokemonComputer[0]}>Print your New Pokemon {pokemonComputer[0]}</button></>}
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

function CleanBoard({ cleanBoard, status, nextPokemon }) {
  

  
  function nextPokemonComputer() {
    cleanBoard();
    nextPokemon();
  }
  return (
    <>
      {status !== null && (
        <button onClick={() => nextPokemonComputer()}>
          {status !== "X" ? `Clean the Board` : `Next Oponent`}
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
