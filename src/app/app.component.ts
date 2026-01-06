import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KatroService } from './services/katro.service';
import { GameState } from './models/game-state'; // ✅ typage fort

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  state!: GameState; // ✅ typage fort
  highlight: boolean[][] = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ];

  constructor(private katro: KatroService) {}

  ngOnInit() {
    this.katro.getState().subscribe((data: GameState) => {
      this.state = data;
    });
  }

  play(row: number, col: number) {
    this.katro.play(row, col).subscribe((data: GameState) => {
      this.state = data;
      this.animatePath();
    });
  }

  reset() {
    this.katro.reset().subscribe((data: GameState) => {
      this.state = data;
      this.highlight = this.highlight.map(row => row.map(() => false));
    });
  }

  isPlayable(row: number): boolean {
    return (
      (this.state.currentPlayer === 0 && (row === 0 || row === 1)) ||
      (this.state.currentPlayer === 1 && (row === 2 || row === 3))
    );
  }

  isCaptured(row: number, col: number): boolean {
    return this.state.lastMove?.captured?.some(
      (c: { row: number; col: number }) => c.row === row && c.col === col
    );
  }

  isActiveRow(row: number): boolean {
    return (
      (this.state.currentPlayer === 0 && (row === 0 || row === 1)) ||
      (this.state.currentPlayer === 1 && (row === 2 || row === 3))
    );
  }

  // ✅ Animation séquentielle du chemin renvoyé par le backend
  animatePath() {
    this.highlight = this.highlight.map(row => row.map(() => false));

    const path: { row: number; col: number }[] = this.state.lastMove?.path ?? [];
    path.forEach((p, i) => {
      setTimeout(() => {
        this.highlight[p.row][p.col] = true;
        if (i > 0) {
          const prev = path[i - 1];
          this.highlight[prev.row][prev.col] = false;
        }
      }, i * 180);
    });

    setTimeout(() => {
      if (path.length) {
        const last = path[path.length - 1];
        this.highlight[last.row][last.col] = false;
      }
    }, path.length * 180 + 300);
  }
}
