import { useEffect, useState } from "react";
import { calculateWinner } from "./calculateWinner";
import { minimax } from "./minimax";
import pokemonOpen from "../images/open-pokeball.png";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({
  nameOponent,
  nameUser,
  onPokemonRender,
  onStatus,
  square,
  setSquares,
  imageSquare,
  setImageSquare,
  onPokemonRenderCpu,
}) {
  const [xIsNext, serXIsnext] = useState(true);
  const [user, setUser] = useState(null);
  const [computer, Setcomputer] = useState(null);

  /* =================Store user and computer objects============================ */
 
  useEffect(() => {
    const user = onPokemonRender.find((p) => p?.name === nameUser);
    const computer = onPokemonRenderCpu.find((p) => p?.name === nameOponent);
    setUser(user);
    Setcomputer(computer);
  }, [onPokemonRender, nameUser, nameOponent, onPokemonRenderCpu]);

  /* ===================Variables==============================*/
  const imageFrontUser = (
    <img src={user?.images?.front_default} alt="pokemon" />
  );
  const imageFrontComp = (
    <img src={computer?.images?.front_default} alt="pokemon" />
  );
  let level =6;
  let Difficulty;
  let computation = user?.experience < computer?.experience ? Math.abs(user?.experience - computer?.experience):
  Math.round(user?.experience / computer?.experience);

  /* =====================level CPU================================ */  
  /* 
- `Easy`: ` 0` .
- `Medium`: `3` - 
- `Difficult`: ` 6` - 
- `Very fullDifficult`: `9` 

*/

if(computation  < 30){
  level = 0.1; 
  Difficulty = "Easy"
};
if(computation > 30 && computation < 60){
  level = 2;
  Difficulty="Medium";
};
if(computation > 60 && computation < 90){
  level = 4;
Difficulty="Difficult";
};
if(computation > 90){
  level = 9;
  Difficulty="Very fullDifficult";
};

  
  /* ====================functions =============================== */

  function handleClick(i) {
    if (square[i] || calculateWinner(square) || !computer) return;
    const nexSquares = square.slice();
    const nexImageSquare = imageSquare.slice();

    nexSquares[i] = "X"; // Human player's move
    nexImageSquare[i] = user?.images?.back_default ? (
      <img key={i} src={user?.images?.back_default} alt="pokemon" />
    ) : (
      <img key={i} src={user?.images?.front_default} alt="pokemon" />
    );
    setSquares(nexSquares);
    setImageSquare(nexImageSquare);

    // AI player's move
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < nexSquares.length; i++) {
      if (nexSquares[i] === null) {
        nexSquares[i] = "O"; 

        let score = minimax(nexSquares, 0, false, -Infinity, Infinity, level);
 
        nexSquares[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== undefined) {
      nexSquares[move] = "O"; 
      console.log(move,i)
      nexImageSquare[move] = computer?.images?.back_default ? (
        <img key={move} src={computer?.images?.back_default} alt="pokemon" />
      ) : (
        <img key={move} src={computer?.images?.front_default} alt="pokemon" />
      
      );
    }

    setSquares(nexSquares);
    setImageSquare(nexImageSquare);
    const isNext = !xIsNext;
    serXIsnext(isNext);
  }

  /* ===================render data web site===================== */

  let winner = calculateWinner(square);
 
  useEffect(() => {
    onStatus(winner);
  }, [winner, onStatus]);

  let status;
  if (winner) {
    status =
      winner === "X" ? (
        <div>
          <span>{user?.name ? user.name : "loading"} You are the winner</span>
          {imageFrontUser}    
        </div>
      ) : (
        <div>
          <span>Winner {nameOponent}</span>
          {imageFrontComp}
        </div>
      );
  } else if (winner === false) {
    status = (
      <div>
        {imageFrontComp} VERSUS {imageFrontUser}
        <p>draw</p>
      </div>
    );
  } else {
    status = (
      <div className="versus">
        <span>{user?.name ? user.name : ""}</span>
        <img src={user?.images?.front_shiny} alt="pokemon" />
        <span>VS</span>
        {computer?.images ? (
          <img src={computer?.images?.front_shiny} alt="pokemon" />
        ) : (
          <div>
            <img src={pokemonOpen} alt="pokemon" />
            <p>Pokeball is empty!</p>
          </div>
        )}
        <span>{computer?.name ? computer.name : ""}</span>
      </div>
    );
  }
/*   - `Easy`: ` 0` .
  - `Medium`: `3` - 
  - `Difficult`: ` 6` - 
  - `Very fullDifficult`: `9` 
   */

  return (
    <>
      <>{status}</>
      <> Difficulty: {Difficulty} {level >3 &&"take care Pokemon is Strong"} </>
      <div
        className="board-row"
        style={{
          gridTemplateColumns: `repeat(${Math.ceil(square.length / 4)}, 1fr)`,
        }}
      >
        {square.map((el, i) => (
         <Square  
            key={i}
            value={[imageSquare[i], square[i]]}
            onSquareClick={() => handleClick(i)}
          />
        
        ))}
      
      </div>
    </>
  );
}

export default function Game({
  onStatus,
  nameOponent,
  nameUser,
  onPokemonRender,
  square,
  setSquares,
  imageSquare,
  setImageSquare,
  onPokemonRenderCpu,

}) {
  return (
      <div >
        <Board
          onPokemonRenderCpu={onPokemonRenderCpu}
          square={square}
          setSquares={setSquares}
          imageSquare={imageSquare}
          setImageSquare={setImageSquare}
          onStatus={onStatus}
          nameOponent={nameOponent}
          nameUser={nameUser}
          onPokemonRender={onPokemonRender}
        />
      </div>
  );
}
