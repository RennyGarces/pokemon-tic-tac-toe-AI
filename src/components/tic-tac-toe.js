import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ nameOponent, nameUser, PokemonComponent }) {
  const [square, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, serXIsnext] = useState(true);
  function handleClick(i) {
    if (square[i] || calculateWinner(square)) return;
    const nexSquares = square.slice();
    xIsNext ? (nexSquares[i] = "X") : (nexSquares[i] = "O");
    setSquares(nexSquares);
    serXIsnext(!xIsNext);
  }
  function handleCleanBoard() {
    const arr = Array(9).fill(null);
    setSquares(arr);
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status =
      winner === "x" ? `Winner : ${nameUser} ` : `Winner: ${nameOponent}`;
  } else {
    status = xIsNext ? `Turn for ${nameUser}` : `Turn for ${nameOponent}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={square[0]} onSquareClick={() => handleClick(0)} />
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
      </div>
      {winner && <button onClick={handleCleanBoard}>Clean Board</button>}
    </>
  );
}

export default function Game({ nameOponent, nameUser, PokemonComponent }) {
  return (
    <div className="game">
      <div className="game-board">
        <Board
          nameOponent={nameOponent}
          nameUser={nameUser}
          PokemonComponent={PokemonComponent}
        />
      </div>
      <div className="game-info"></div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
