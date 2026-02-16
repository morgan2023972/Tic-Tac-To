const { createBoard, applyMove, checkWin, isDraw, formatBoard } = require('../game');

test('createBoard returns 9 nulls', () => {
  const b = createBoard();
  expect(b).toHaveLength(9);
  expect(b.every(x => x === null)).toBe(true);
});

test('applyMove succeeds on empty cell and is non-mutating', () => {
  const b = createBoard();
  const res = applyMove(b, 0, 'X');
  expect(res.ok).toBe(true);
  expect(res.board[0]).toBe('X');
  // original stays unchanged
  expect(b[0]).toBeNull();
});

test('applyMove fails on occupied cell', () => {
  const b = createBoard();
  const res1 = applyMove(b, 1, 'O');
  expect(res1.ok).toBe(true);
  const res2 = applyMove(res1.board, 1, 'X');
  expect(res2.ok).toBe(false);
  expect(res2.reason).toBe('occupied');
});

test('checkWin detects horizontal win', () => {
  const b = ['X','X','X', null, null, null, null, null, null];
  expect(checkWin(b)).toBe('X');
});

test('isDraw detects full board without winner', () => {
  const b = ['X','O','X','X','O','O','O','X','X'];
  expect(isDraw(b)).toBe(true);
});

test('formatBoard returns a string', () => {
  const b = createBoard();
  const s = formatBoard(b);
  expect(typeof s).toBe('string');
  expect(s.length).toBeGreaterThan(0);
});
