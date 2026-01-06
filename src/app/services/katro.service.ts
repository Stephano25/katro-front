import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameState } from '../models/game-state'; // ✅ import du modèle

@Injectable({
  providedIn: 'root',
})
export class KatroService {
  private apiUrl = 'http://localhost:3000/katro';

  constructor(private http: HttpClient) {}

  getState(): Observable<GameState> {
    return this.http.get<GameState>(`${this.apiUrl}/state`);
  }

  play(row: number, col: number): Observable<GameState> {
    return this.http.post<GameState>(`${this.apiUrl}/play`, { row, col });
  }

  reset(): Observable<GameState> {
    return this.http.post<GameState>(`${this.apiUrl}/reset`, {});
  }
}
