import React, { useState, useEffect } from "react";
import { LoadPokemons, GetPokemonsName } from "./module.js";

export function PokemonComponent({ pokemonName, onGetPokemon, reset }) {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!pokemonName[0]) return;
         const trainerCpu = await HandleTrainer();

        let data = await LoadPokemons(pokemonName[0]);
        if (data.name) {
          const newPokemon = [
            {
              id: data.id,
              abilities: data.abilities,
              experience: data.base_experience,
              default: data.is_default,
              name: data.name,
              images: data.sprites,
              height: data.height,
              weight: data.weight,
              type: data.types,
              order: data.order,
              owner: pokemonName[1],
              trainer: trainerCpu.name,
              trainerLocation: trainerCpu.location,
              trainerPicture: trainerCpu.picture,
            },
          ];

          setPokemon(newPokemon);
          onGetPokemon(newPokemon);
      
     
        }
        setError(null);
      } catch (error) {
        setError(error);       
      }
    };

    fetchData();
  }, [pokemonName]);

  return (
    <>
      {error|| pokemon.length < 1 ?<div className="principal_buttons_error"> 
        <button onClick={() => reset()}>RESET GAME</button>
        <p> `Pokemon does not exist`</p>
        </div>:"" }
      {pokemon.map((el) => (
        <div key={el.id} className="card">
          <div className="card_img">
          <img src={el.images.front_default} alt={el.name}></img>
          <p> {el.name}</p>
          </div>
          <div>
            <h3>POWER</h3>
            {el.abilities.map((ability, index) => {
              return <p key={index}> {ability.ability.name} </p>;
            })}
          </div>
          <div>
          <h3>LEVEL {el.experience? el.experience:`like God`}</h3>
          <h3>
            HEIGHT {el.height} WEIGHT {el.weight}
          </h3>
          <h3>ORDER {el.order}</h3>
          </div>
          <div>
            <h3>TYPE</h3>
            {el.type.map((type, index) => (
              <p key={index}>{type.type.name}</p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export async function PokemonsRandorComputer(onPokemon, number) {
  const randomName = Math.floor(Math.random() * number) + 1;
  try {
    const data = await GetPokemonsName(randomName);
    const name = data.results[0].name;

    onPokemon(name);
  } catch (error) {
    throw error;
  }
}

async function HandleTrainer(){
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const trainer ={
      name: data.results[0].name.first,
      location: data.results[0].location.country,
    picture: data.results[0].picture.thumbnail }
   return trainer;
  } catch (error) {
    console.error(error);
  }
}