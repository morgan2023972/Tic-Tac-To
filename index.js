const readline = require('readline');
const {
  createBoard,
  printBoard,
  applyMove,
  checkWin,
  isDraw,
} = require('./game');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function main() {
  const board = createBoard();
  let current = 'X';
  console.log('Morpion (Tic-tac-toe) - Joueurs: X et O');
  printBoard(board);

  while (true) {
    const ans = await question(`${current} - Entrez une case (1-9) > `);
    const pos = parseInt(ans.trim(), 10) - 1;
    if (Number.isNaN(pos)) {
      console.log('Entrée invalide, réessayez.');
      continue;
    }
    // Use non-mutating applyMove and update board on success
    const res = applyMove(board, pos, current);
    if (!res.ok) {
      console.log(
        res.reason === 'occupied'
          ? 'Coup invalide: case occupée.'
          : 'Coup invalide: hors limites.'
      );
      continue;
    }
    // replace board with new immutable board
    board.length = 0;
    board.push(...res.board);
    printBoard(board);
    const winner = checkWin(board);
    if (winner) {
      console.log(`Gagnant: ${winner}`);
      break;
    }
    if (isDraw(board)) {
      console.log('Match nul.');
      break;
    }
    current = current === 'X' ? 'O' : 'X';
  }

  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
});
