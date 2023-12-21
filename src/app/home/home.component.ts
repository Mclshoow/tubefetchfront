import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarrosselComponent } from '../carrossel/carrossel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarrosselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
