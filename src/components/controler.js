import React, { useState, useEffect } from "react";
import LoadPokemons from "./module.js";
export function PokemonComponent({ pokemonName }) {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!pokemonName) return;
        const data = await LoadPokemons(pokemonName);
        const newPokemon = [
          {
            id: data.id,
            location: data.location_area_encounters,
            abilities: data.abilities,
            experience: data.base_experience,
            default: data.is_default,
            name: data.name,
            species: data.species,
            images: data.sprites,
            items: data.held_items,
          },
        ];

        setPokemon(newPokemon);
        setError(null);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [pokemonName]);

  if (error || pokemon.length < 1) {
    return (
      <h2>
        {error ? `Error: Sorry we don't got your pockemón try again` : ""}
      </h2>
    );
  }

  return (
    <div>
      {console.log(pokemon)}
      <h1>hi</h1>
    </div>
  );
}
