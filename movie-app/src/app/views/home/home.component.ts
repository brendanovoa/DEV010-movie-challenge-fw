import { Component, OnInit, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/shared/interfaces/movies';

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

  constructor(private service: DataService){}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.service.getMovies().subscribe((resp) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }
}
