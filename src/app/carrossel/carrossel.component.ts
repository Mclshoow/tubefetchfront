import { NgOptimizedImage, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent {
  imagens: string[] = [
    'https://picsum.photos/id/17/2500/1667',
    'https://picsum.photos/id/18/2500/1667',
    'https://picsum.photos/id/19/2500/1667',
    // Adicione mais imagens conforme necessário
  ];

  slideIndex = 1;
  timerSubs!: Subscription;

  ngOnInit() {
    this.mostrarImagem(this.slideIndex);
    this.iniciarTimer();
  }

  ngOnDestroy() {
    this.pararTimer();
  }

  iniciarTimer() {
    this.timerSubs = timer(5000).subscribe(() => {
      this.navegar(1);
    });
  }

  pararTimer() {
    this.timerSubs?.unsubscribe();
  }

  navegar(n: number) {
    this.mostrarImagem(this.slideIndex += n);
  }

  async mostrarImagem(n: number) {
    let i;
    const slides = await document.getElementsByClassName('carousel-item') as HTMLCollectionOf<HTMLElement>;

    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[this.slideIndex - 1].style.display = 'block';
  }
}
