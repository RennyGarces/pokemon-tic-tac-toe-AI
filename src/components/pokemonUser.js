import { useState } from "react";
import { PokemonComponent } from "./controler";
import Tictactoe from "./tic-tac-toe";

export default function PokemonBattle() {
  const [pokemonUser, setPokemonUser] = useState("paras");
  const [pokemonComputer, setPokemonComputer] = useState("charmander");
  const [pokemonRender, setPokemonRender] = useState([]);

  function handlePokemonRender(newPokemon) {
    setPokemonRender((pokemonRender) => [...pokemonRender, newPokemon]);
  }

  function handlePokemonUser(name) {
    setPokemonUser(name);
  }
  function handlePokemonComputer(name) {
    setPokemonComputer(name);
  }
  return (
    <div className="container">
      <ChoosePokemon onPokemon={handlePokemonUser} />
      <PokemonComponent
        pokemonName={pokemonUser}
        onGetPokemon={handlePokemonRender}
      />
      <Tictactoe
        nameOponent={pokemonComputer}
        nameUser={pokemonUser}
        onPokemonRender={pokemonRender}
      />
      <PokemonInput onPokemon={handlePokemonComputer} />
      <PokemonComponent
        pokemonName={pokemonComputer}
        onGetPokemon={handlePokemonRender}
      />
    </div>
  );
}
/* get pokemon from the input field */
function PokemonInput({ onPokemon }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function handlePokemon(e) {
    e.preventDefault();
    const regex = /^[a-zA-Z]{3,10}$/;
    if (input && regex.test(input)) {
      onPokemon(input.toLocaleLowerCase());
      setError(false);
      setInput("");
    } else {
      setError(true);
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
      {error && <h1>`Please type your pockemón again `</h1>}
    </div>
  );
}
/* ======================================================= */
/* user's Pokemon */
function ChoosePokemon({ onPokemon }) {
  function firstPokemon(e) {
    e.preventDefault();
    onPokemon(e.target.value);
  }

  return (
    <div>
      <button value="paras" onClick={firstPokemon}>
        Paras
      </button>
      <button value="leavanny" onClick={firstPokemon}>
        leavanny
      </button>

      <button value="cacturne" onClick={firstPokemon}>
        cacturne
      </button>
    </div>
  );
}
