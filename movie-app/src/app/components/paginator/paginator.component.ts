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

  // Declarar variable para guardar petición en vacío
  movies: Movie[] = [];
  current_page: number = 1;
  page_size: number = 20;
  total_length: number = 10000; //API total_results
  //page: number[] = [];
  //pageSizeOptions = [20];
  //selected_sort: string = '';
  //filter_option: string = '';
  //release_year: string = '';
  //default_sort: string = 'popularity.desc';
  //default_filter: string = '28';

  //total_pages: number; // 41259
  //total_results: number; // 825179

  constructor(private service: DataService ) { }

  ngOnInit(): void {
    this.getData();
    //this.service.getMovies(this.current_page)
  }

  @Output() moviesChanged: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();
  /*EventEmitter es una clase que se utiliza para emitir eventos personalizados desde un componente hijo hacia un componente padre*/

  getData() {
    this.service.getMovies(this.current_page).subscribe((resp) => {
      console.log(resp);
      this.movies = resp.results;
      this.total_length = 10000;
      this.moviesChanged.emit(this.movies); // Emitir las películas al componente padre
    });
  }

  // Se vuelve a llamar a la función con el nuevo número de página
  handlePageEvent(pageEvent: PageEvent) {
    this.page_size = pageEvent.pageSize;
    this.current_page = pageEvent.pageIndex +1;
    this.getData(); // Llamar getData para obtener nuevas películas
  }
    /*handlePageEvent(pageEvent: PageEvent) {
    this.page_size = pageEvent.pageSize;
    this.current_page = pageEvent.pageIndex + 1;
    this.getData(this.current_page); 
    // this.service.getMovies(this.current_page); 
    // this.filter_option, this.selected_sort
  }*/
}
