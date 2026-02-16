function createBoard() {
  return Array(9).fill(null);
}

function formatBoard(board) {
  const toCell = (v, i) => (v ? v : String(i + 1));
  return `\n ${toCell(board[0],0)} | ${toCell(board[1],1)} | ${toCell(board[2],2)}\n` +
    '---+---+---\n' +
    ` ${toCell(board[3],3)} | ${toCell(board[4],4)} | ${toCell(board[5],5)}\n` +
    '---+---+---\n' +
    ` ${toCell(board[6],6)} | ${toCell(board[7],7)} | ${toCell(board[8],8)}\n`;
}

function applyMove(board, pos, mark) {
  if (!Number.isInteger(pos)) return { ok: false, reason: 'out-of-range' };
  if (pos < 0 || pos > 8) return { ok: false, reason: 'out-of-range' };
  if (board[pos]) return { ok: false, reason: 'occupied' };
  const newBoard = board.slice();
  newBoard[pos] = mark;
  return { ok: true, board: newBoard };
}

function checkWin(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function isDraw(board) {
  return board.every(Boolean) && !checkWin(board);
}

module.exports = {
  createBoard,
  applyMove,
  checkWin,
  isDraw,
  formatBoard
};
