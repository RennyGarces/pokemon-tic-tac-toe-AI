import { useEffect, useState } from "react";
import { calculateWinner } from "./calculateWinner";
import { minimax } from "./minimax";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ nameOponent, nameUser, onPokemonRender }) {
  const [square, setSquares] = useState(Array(9).fill(null));
  const [imageSquare, setImageSquare] = useState(Array(9).fill(null));
  const [xIsNext, serXIsnext] = useState(true);
  const [user, setUser] = useState(null);
  const [computer, Setcomputer] = useState(null);

  /* =================Store user and computer objects============================ */
  useEffect(() => {
    const user = onPokemonRender
      .flatMap((render) => render)
      .find((render) => render.name === nameUser);
    const computer = onPokemonRender
      .flatMap((render) => render)
      .find((render) => render.name === nameOponent);
    setUser(user);
    Setcomputer(computer);
  }, [onPokemonRender, nameUser, nameOponent]);
  /* ===================Variables==============================*/
  const imageFrontUser = (
    <img src={user?.images?.front_default} alt="pokemon" />
  );
  const imageFrontComp = (
    <img src={computer?.images?.front_default} alt="pokemon" />
  );

  /* ====================functions =============================== */

  function handleClick(i) {
    if (square[i] || calculateWinner(square)) return;
    const nexSquares = square.slice();
    const nexImageSquare = imageSquare.slice();

    nexSquares[i] = "X"; // Human player's move
    nexImageSquare[i] = (
      <img key={i} src={user?.images?.back_default} alt="pokemon" />
    );
    setSquares(nexSquares);
    setImageSquare(nexImageSquare);

    // AI player's move
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < nexSquares.length; i++) {
      if (nexSquares[i] === null) {
        nexSquares[i] = "O"; // AI player's move

        let score = minimax(nexSquares, 0, false);
        nexSquares[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== undefined) {
      nexSquares[move] = "O"; // AI player's move
      nexImageSquare[move] = (
        <img key={move} src={computer?.images?.back_default} alt="pokemon" />
      );
    }

    setSquares(nexSquares);
    setImageSquare(nexImageSquare);
    const isNext = !xIsNext;
    serXIsnext(isNext);
  }

  function handleCleanBoard() {
    const arr = Array(9).fill(null);
    setSquares(arr);
    setImageSquare(arr);
  }
  /* ===================render data web site===================== */

  let winner = calculateWinner(square);

  let status;
  if (winner) {
    status =
      winner === "X" ? (
        <>
          <span>Winner :{user?.name ? user.name : "loading"}</span>
          {imageFrontUser}
        </>
      ) : (
        <>
          <span>Winner {nameOponent}</span>
          {imageFrontComp}
        </>
      );
  } else if (winner === false) {
    status = (
      <div>
        {imageFrontComp} vs {imageFrontUser}
        <p>
          {nameOponent} Vs {nameUser}
          no one win play again
        </p>
        {winner === false && (
          <button onClick={handleCleanBoard}>Clean Board</button>
        )}
      </div>
    );
  } else {
    status = xIsNext ? (
      <>
        <span>Next turn is for {user?.name ? user.name : "loading"}</span>
        {imageFrontUser}
      </>
    ) : (
      <>
        <span>Next turn is for {nameOponent}</span>
        {imageFrontComp}
      </>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
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

      {winner && <button onClick={handleCleanBoard}>Clean Board</button>}
    </>
  );
}

export default function Game({ nameOponent, nameUser, onPokemonRender }) {
  return (
    <div className="game">
      <div className="game-board">
        <Board
          nameOponent={nameOponent}
          nameUser={nameUser}
          onPokemonRender={onPokemonRender}
        />
      </div>
      <div className="game-info"></div>
    </div>
  );
}
