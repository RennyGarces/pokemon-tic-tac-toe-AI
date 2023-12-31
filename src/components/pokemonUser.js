import { useState } from "react";
import { PokemonComponent } from "./controler";

export default function PokemonUser() {
  const [pokemonName, setPokemonName] = useState("");

  function handlePokemonName(name) {
    setPokemonName(name);
  }
  return (
    <div>
      <PokemonInput onPokemon={handlePokemonName} />
      <PokemonComponent pokemonName={pokemonName} />
    </div>
  );
}

function PokemonInput({ onPokemon }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function handlePokemon(e) {
    e.preventDefault();
    const regex = /^[a-zA-Z]{3,10}$/;
    if (input && regex.test(input)) {
      onPokemon(input.toLocaleLowerCase());
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <form onSubmit={handlePokemon}>
        <input type="text" onChange={(e) => setInput(e.target.value)}></input>
      </form>
      {error && <h1>`Please type your pockemón again `</h1>}
    </div>
  );
}
