import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Movie } from 'src/app/shared/interfaces/movies';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  // Se pueden inicializar algunos valores para buena práctica
  @Input() movie: Movie = {
    adult: true,
    backdrop_path: 'example',
    genre_ids: [],
    id: 0,
    original_language: 'English',
    original_title: 'Apocalypto',
    overview: 'example',
    popularity: 7,
    poster_path: '',
    release_date: '2006-12-07',
    title: 'Apocalypto',
    video: false,
    vote_average: 10,
    vote_count: 10,
    total_pages: 1,
    total_results: 1,
    page: 1,
    production_companies: [],
    genres: [],
};

  @Input() title!: string;
  // @Input() poster!: string | null;
  imageUrl!: SafeStyle; //Cambiar string por SafeStyle para que Angular no de Warning

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Convertir la ruta relativa que devolvía la propiedad a una ruta absoluta válida y segura
    const posterPath = this.movie?.poster_path;
    this.imageUrl = posterPath ? `https://image.tmdb.org/t/p/w154${posterPath}` : '../../../assets/not-available.png';
  }

  openNewTab(movieId: number | undefined) {
    const idToUse = movieId ?? 0;
    window.open(`/movieDetails?id=${idToUse}`, '_blank');
    /*this.router.navigate(['/movieDetails', idToUse]).then(() => {
      window.open(`/movieDetails?id=${idToUse}`, '_blank');
    });*/
  }
}

/*const url = this.router.serializeUrl(
  this.router.createUrlTree(['/movieDetails', movieId])
);*/

// Cuando se utiliza [style.background-image]="imageUrl", Angular advertirá que estás intentando aplicar una cadena de estilo directamente, lo que puede ser vulnerable a ataques de inyección de código.
// SafeStyle indica a Angular que la cadena es segura y ha sido verificada contra ataques XSS. Esto se logra utilizando DomSanitizer para convertir la cadena en un objeto seguro antes de asignarlo a una variable. 
// bypassSecurityTrustStyle ignores security while sanitize(SecurityContext.STYLE, style) reinforces security.
