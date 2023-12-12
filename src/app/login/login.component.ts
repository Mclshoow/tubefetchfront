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
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  username = "";
  password = "";
  isAuthenticated = false;
  title = 'Tic Tac Toe';

  constructor(public authService: AuthService) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }
  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }
  logout() {
    this.authService.logout('/');
  }

  onSubmit() {
    // Aqui você pode adicionar lógica para lidar com a submissão do formulário
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Adicione lógica para autenticação, chamadas de API, etc.
  }
}
