export function calculateWinner(squares) {
  const size = Math.sqrt(squares.length);
  function createWinningLines(size) {
    let lines = [];

    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, j) => i * size + j));
    }
    for (let i = 0; i < size; i++) {
      lines.push(Array.from({ length: size }, (_, j) => j * size + i));
    }
    lines.push(Array.from({ length: size }, (_, i) => i * size + i));
    lines.push(
      Array.from({ length: size }, (_, i) => i * size + (size - i - 1))
    );

    return lines;
  }

  const lines = createWinningLines(size);
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let firstSquare = squares[line[0]];
    const winner =
      firstSquare && line.every((index) => squares[index] === firstSquare);
    if (winner) {
      return firstSquare;
  
    }
  }
  const full = squares.every((el) => el != null);
  if (full) {
    return false;
  }

  return null;
}
