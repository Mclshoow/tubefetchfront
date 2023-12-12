import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { FlexLayoutModule } from "@angular/flex-layout";
import Minimax from "tic-tac-toe-minimax";
const { GameStep } = Minimax;

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent implements OnInit {
  public gameState: Array<number | string> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  public winner = "";
  public playing = false;
  public computerFirst = false;
  public difficulty: 'Easy' | 'Normal' | 'Hard' = 'Normal';
  constructor() { }
  ngOnInit() {
  }
  toggleGame(toggle: boolean) {
    if (toggle === this.playing) {
      return;
    }
    this.gameState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.winner = "";
    if (toggle && this.computerFirst) {
      this.makeComputerMove();
    }
    this.playing = toggle;
  }
  makeComputerMove() {
    const symbols = {
      huPlayer: 'X',
      aiPlayer: 'O'
    };
    const winnerMapping = {
      huPlayer: 'Human Wins!',
      aiPlayer: 'Computer Wins!',
      draw: 'It\'s a Draw!'
    };
    const result = GameStep(this.gameState, symbols, this.difficulty);
    this.gameState = result.board;
    if (result.winner) {
      this.winner = winnerMapping[result.winner];
      this.playing = false;
    }
  }
  makeHumanMove(field: number) {
    if (!this.playing || typeof this.gameState[field] !== 'number') {
      return;
    }
    this.gameState[field] = 'X';
    this.makeComputerMove();
  }
}
