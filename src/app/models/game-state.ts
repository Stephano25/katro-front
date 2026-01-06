export interface CellPos {
  row: number;
  col: number;
}

export interface LastMove {
  start: CellPos;
  end: CellPos;
  path: CellPos[];
  captured: CellPos[];
}

export interface GameState {
  board: number[][];       // Plateau 4x4
  scores: number[];        // [Joueur 1, Joueur 2]
  currentPlayer: number;   // 0 = Joueur 1, 1 = Joueur 2
  gameOver: boolean;
  lastMove: LastMove;
}
