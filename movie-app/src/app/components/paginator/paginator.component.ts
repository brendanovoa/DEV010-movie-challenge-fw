import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from '../../services/data.service';
import { Movie, APIresponse } from 'src/app/shared/interfaces/movies';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  // Declarar variable para guardar petición en vacío
  movies: Movie[] = [];
  current_page: number = 1;
  page_size: number = 20;
  total_length: number = 10000; //API total_results
  selectedGenre: number | null = null;
  //page: number[] = [];
  //pageSizeOptions = [20];
  //total_pages: number; // 41259 páginas
  //total_results: number; // 825179 peículas

  constructor(private service: DataService ) { }

  ngOnInit(): void {
    //this.getData();
    //this.service.getMovies(this.current_page)
  }

  // Se vuelve a llamar a la función con el nuevo número de página
  handlePageEvent(pageEvent: PageEvent) {
    this.page_size = pageEvent.pageSize;
    this.current_page = pageEvent.pageIndex +1;
    this.pageChanged.emit(pageEvent); // Emitir evento de cambio de página
    //this.getData(); // Llamar getData para obtener nuevas películas
  }
}

// *** NOTAS *** //

//@Output() moviesChanged: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();
/*EventEmitter es una clase que se utiliza para emitir eventos personalizados desde un componente hijo hacia un componente padre*/

/*getData() {
  this.service.getMovies(this.current_page, this.selectedGenre).subscribe((resp) => {
    console.log(resp);
    this.movies = resp.results;
    this.total_length = 10000;
    this.moviesChanged.emit(this.movies); // Emitir las películas al componente padre
  });
// Suscribirse al evento moviesUpdated
  this.service.moviesUpdated.subscribe((moviesWithMetadata) => {
    this.movies = moviesWithMetadata.movies;
    //this.movies = updatedMovies; //updatedMovies
    this.total_length = 10000; // Ajusta según tus necesidades
    this.moviesChanged.emit(this.movies); // Emitir las películas al componente padre
  });
}*/
