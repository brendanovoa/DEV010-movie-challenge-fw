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
  total_length: number = 0;
  current_page: number = 0;
  page_size: number = 20;
  //page: number[] = [];
  //pageSizeOptions = [20];
  //selected_sort: string = '';
  //filter_option: string = '';
  //release_year: string = '';
  //default_sort: string = 'popularity.desc';
  //default_filter: string = '28';

  //total_pages: number; // 41259
  //total_results: number; // 825179

  constructor(private service: DataService){}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.service.getMovies(this.current_page).subscribe((resp) => {
      console.log(resp);
      this.movies = resp.results;
      //this.current_page = resp.page;
      this.total_length = resp.total_results;
    });
  }
}
