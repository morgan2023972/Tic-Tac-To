# API — module `game.js`

Ce fichier décrit l'API fournie par le module `game.js` du projet Tic‑Tac‑Toe.

Invariants
- Le plateau (`board`) est un tableau de 9 éléments : indices 0..8.
- Valeurs attendues : `null` pour case vide, ou `'X'` / `'O'` pour une case occupée.

Fonctions exportées

1. `createBoard()`
   - Description : crée et retourne un nouveau plateau initialisé.
   - Signature : `() => (Array.<null|"X"|"O">)`
   - Exemple :

```js
const board = createBoard(); // [null, null, ..., null]
```

2. `printBoard(board)`
   - Description : affiche le plateau dans la console (utilise `console.log`).
   - Signature : `(Array) => void`
   - Remarque : fonction d'affichage — utile pour CLI; pour tests, préférez capturer la sortie ou convertir en string.

3. `applyMove(board, pos, mark)`
   - Description : applique un coup de façon non‑mutante — retourne un nouvel état du plateau.
   - Signature : `(Array, number, string) => { ok: boolean, board?: Array, reason?: string }`
   - Comportement : ne modifie pas `board`. Si `ok: true`, le nouvel état est dans `board`.
   - Exemple :

```js
const res = applyMove(board, 0, 'X');
if (!res.ok) console.log('Coup invalide:', res.reason);
else board = res.board;
```

4. `makeMove(board, pos, mark)` (compatibilité)
   - Description : helper qui modifie `board` en place et retourne `true/false`. Utilisez `applyMove` pour une API moderne.
   - Signature : `(Array, number, string) => boolean`
   - Comportement : mutates `board` on success.

5. `formatBoard(board)`
   - Description : retourne une `string` représentant le plateau (sépare logique et affichage). Pratique pour tests.
   - Signature : `(Array) => string`

6. `printBoard(board)`
   - Description : affiche le plateau en console; appelle `formatBoard`.
   - Signature : `(Array) => void`

4. `checkWin(board)`
   - Description : détecte un gagnant. Parcourt les 8 lignes gagnantes classiques.
   - Signature : `(Array) => null | "X" | "O"`
   - Retour : `'X'` ou `'O'` si victoire, `null` sinon.

5. `isDraw(board)`
   - Description : indique si la partie est nulle (toutes les cases occupées et pas de gagnant).
   - Signature : `(Array) => boolean`

Utilisation rapide

```js
const { createBoard, printBoard, makeMove, checkWin, isDraw } = require('../game');
const board = createBoard();
makeMove(board, 0, 'X');
makeMove(board, 4, 'O');
printBoard(board);
const winner = checkWin(board);
if (winner) console.log('Gagnant:', winner);
else if (isDraw(board)) console.log('Match nul');
```

Suggestions d'amélioration (notes de maintenance)
- `makeMove` mutate le plateau : envisager une version non mutante qui retourne `{ ok, board, reason? }` pour faciliter les tests.
- Ajouter une fonction `formatBoard(board)` qui retourne une `string` (séparation affichage/logique) pour mieux tester l'affichage.
- Détailler les erreurs en renvoyant un objet au lieu d'un `boolean` pour améliorer le feedback côté CLI.
- Ajouter des tests unitaires (Jest/Mocha) pour couvrir victoires, coups invalides et match nul.

Fichier source : `game.js` (racine du projet)
