import { Component, OnInit, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Movie, APIresponse } from 'src/app/shared/interfaces/movies';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  // Patrón de inyección de dependencias para toda la app
  http = inject(HttpClient);

  // Declarar variable para guardar petición en vacío
  movies: Movie[] = [];
  selectedGenre: number | null = null;
  selectedSort: string | null = 'popularity.desc';
  //default_sort: string = 'popularity.desc';
  //default_filter: string = '28';

  constructor(private service: DataService){}

  ngOnInit(): void {
    // Inicializar con películas sin género seleccionado
    this.loadMovies(1);
  }

  handlePageEvent(pageEvent: PageEvent) {
    // Lógica para cargar las películas con la nueva página
    this.loadMovies(pageEvent.pageIndex + 1);
  }

  onGenreSelected(selectedGenre: number | null) {
    // Lógica para cargar las películas con el nuevo género
    this.selectedGenre = selectedGenre;
    this.loadMovies(1);
  }

  onSelectedSort(selectedSort: string | null) {
    // Lógica para cargar las películas con el nuevo orden
    this.selectedSort = selectedSort;
    this.loadMovies(1);
  }

  private loadMovies(page: number) {
    // Manejar null antes de llamar al servicio
    const selectedSort = this.selectedSort !== null ? this.selectedSort : 'popularity.desc';
    const selectedGenre = this.selectedGenre !== null ? this.selectedGenre : null;
    //const selectedGenre = this.selectedGenre;

    this.service.getMovies(page, selectedGenre, selectedSort).subscribe((resp) => {
      console.log(resp);
      this.movies = resp.results;
    });
  }
}

// *** NOTAS *** //

/*if (selectedGenre !== null) {
  this.service.getMovies(1, selectedGenre).subscribe((resp) => {
    this.movies = resp.results;
  });
}*/

/*this.service.getMovies(pageEvent.pageIndex + 1).subscribe((resp) => {
  this.movies = resp.results;
});*/

/*getData() {
  this.service.getMovies(this.current_page).subscribe((resp) => {
    console.log(resp);
    this.movies = resp.results;
    //this.current_page = resp.page;
    this.total_length = resp.total_results;
  });
}*/

/*Esta función se utiliza para manejar el cambio en la lista de películas. Cuando el componente Paginator emite un evento indicando que se han cargado nuevas películas, esta función se activa. Su propósito es actualizar la lista de películas en el componente Movies, lo que lleva a una actualización en la vista.*/
/*handleMoviesChange(newMovies: Movie[]) {
  this.movies = newMovies;
}*/

/*getMovieDetails(id: number){
  window.open(`/movie-details?id=${id}`, '_blank');
}*/
