import {PokemonBattle} from "./pokemonBattle";
import {useState} from "react";
export default function App() {

  return (
     <div>
      <ImputFromUser/>
       <PokemonBattle />
     </div>
  
  );
}

function ImputFromUser() {
  const [name, setName] = useState("");
  return (
    <div>
      <form>
        <label>
          Name:
          <input  value={name} onChange={(e)=> setName(e.value.target)} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}