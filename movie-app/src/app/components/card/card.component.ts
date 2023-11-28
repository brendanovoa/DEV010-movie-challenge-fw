import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movies';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() movie: Movie | undefined; //Se pueden inicializar algunos valores para buena práctica
  @Input() title!: string;
  // @Input() poster!: string | null;
  imageUrl!: SafeStyle; //Cambiar string por SafeStyle para que Angular no de Warning

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Convertir la ruta relativa que devolvía la propiedad a una ruta absoluta válida y segura
    const posterPath = this.movie?.poster_path;
    this.imageUrl = posterPath ? `https://image.tmdb.org/t/p/w154${posterPath}` : '../../../assets/not-available.png';
  }
}
