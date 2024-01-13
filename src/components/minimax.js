import { calculateWinner } from "./calculateWinner";

export function minimax(board, depth, isMaximizingPlayer, alpha, beta, maxDepth) {
  let winner = calculateWinner(board);

  if (winner !== null) {
    return winner === "X" ? -10 + depth : 10 - depth;
  }

  if (isBoardFull(board) || depth === maxDepth) {
    return 0;
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, depth + 1, false, alpha, beta, maxDepth);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "X";
        let score = minimax(board, depth + 1, true, alpha, beta, maxDepth);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return bestScore;
  }
}

function isBoardFull(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) return false;
  }
  return true;
}
 