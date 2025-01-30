import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Movie, Genre, GenresList } from 'src/app/shared/interfaces/movies';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class FiltersComponent implements OnInit {
  @Output() genreSelected: EventEmitter<number | null> = new EventEmitter<number | null>();
  @Output() sortSelected: EventEmitter<string | null> = new EventEmitter<string | null>();

  movies: Movie[] = [];
  genres: Genre[] = [];
  genreFilter: GenresList[] = [];
  selectedGenre: number | null = null;
  sortOptions: any[] = [{option: 'popularity.desc', text: 'More popular'}, 
                        {option: 'vote_average.desc', text: 'Best voted'},
                        {option: 'vote_average.asc', text: 'Worst voted'}];
  defaultSort: string = 'popularity.desc'
  selectedSort: string | null = ''

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.newloadGenres();
    // this.loadGenres();
  }

  newloadGenres() {
    this.genres = [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 12,
          "name": "Adventure"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 99,
          "name": "Documentary"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Family"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Music"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10749,
          "name": "Romance"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        },
        {
          "id": 10770,
          "name": "TV Movie"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "War"
        },
        {
          "id": 37,
          "name": "Western"
        }
      ]
  }

  loadGenres() {
    this.service.getGenresList().subscribe((genresList: GenresList) => {
      console.log(genresList);
      this.genres = genresList.genres;
    });
  }

  onClick() {
      this.genreSelected.emit(this.selectedGenre);
      this.sortSelected.emit(this.selectedSort || this.defaultSort);
      console.log(this.selectedSort);
      console.log(this.selectedGenre)
  }
}

// *** NOTAS *** //

// Llamar al servicio para obtener las películas con el género seleccionado
//this.service.getMovies(1, this.selectedGenre).subscribe((resp) => {
// Recibir la respuesta de películas
//this.movies = resp.results;
//this.service.moviesUpdated.next(resp.results);});

/*private sortSelectedSource = new BehaviorSubject<string>('');
  selectedSort$ = this.sortSelectedSource.asObservable();
  selectedSort(sortOption: string) {
    this.sortSelectedSource.next(sortOption);
}*/

// Método para manejar el evento de selección de género
  /*onGenreChange() {
    // Se puede actualizar la llamada a la API o ejecutar otro tipo de lógica
  }*/
