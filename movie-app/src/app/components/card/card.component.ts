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

// Cuando se utiliza [style.background-image]="imageUrl", Angular advertirá que estás intentando aplicar una cadena de estilo directamente, lo que puede ser vulnerable a ataques de inyección de código.
// SafeStyle indica a Angular que la cadena es segura y ha sido verificada contra ataques XSS. Esto se logra utilizando DomSanitizer para convertir la cadena en un objeto seguro antes de asignarlo a una variable. 
// bypassSecurityTrustStyle ignores security while sanitize(SecurityContext.STYLE, style) reinforces security.
