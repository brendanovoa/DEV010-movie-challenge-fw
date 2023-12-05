import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @Input() movies: Movie[] = [];
  //@Input() movies: Movie[] | null = null

  constructor() { }

  ngOnInit(): void {
  }

  handleMoviesChange(newMovies: Movie[]) {
    this.movies = newMovies;
  }
  /*Esta función se utiliza para manejar el cambio en la lista de películas. Cuando el componente Paginator emite un evento indicando que se han cargado nuevas películas, esta función se activa. Su propósito es actualizar la lista de películas en el componente Movies, lo que lleva a una actualización en la vista.*/
}
