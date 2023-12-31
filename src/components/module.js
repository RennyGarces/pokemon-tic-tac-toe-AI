export default async function LoadPokemons(pokemon) {
  try {
    const res = await Promise.race([
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`),
      Timeout(5),
    ]);
    if (!res.ok)
      throw new Error(`Sorry we can't find the pokemón error :${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function Timeout(sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Sorry we have issues with the poket server"));
    }, sec * 1000);
  });
}
