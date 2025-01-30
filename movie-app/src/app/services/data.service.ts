import { Injectable, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie, APIresponse, GenresList } from 'src/app/shared/interfaces/movies';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  // Definir el Endpoint al que conectarse
  private API = 'https://api.themoviedb.org/3/';
  private apiKey = '3bf3e2fd0b4078b4ce8778ca08a057cd';
  private apiReadToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmYzZTJmZDBiNDA3OGI0Y2U4Nzc4Y2EwOGEwNTdjZCIsIm5iZiI6MTcwMDE1Mzg2OC4wMjksInN1YiI6IjY1NTY0YTBjN2YwNTQwMDBmZjM2M2U0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8jNxFPWWiNMDCY4QQDo23fkbVWjEqIdVUMDza82_IF8';

  // 'https://api.themoviedb.org/3/movie/11' \
  // 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmYzZTJmZDBiNDA3OGI0Y2U4Nzc4Y2EwOGEwNTdjZCIsIm5iZiI6MTcwMDE1Mzg2OC4wMjksInN1YiI6IjY1NTY0YTBjN2YwNTQwMDBmZjM2M2U0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8jNxFPWWiNMDCY4QQDo23fkbVWjEqIdVUMDza82_IF8'

  // Inicializar el constructor httpclient
  constructor(private http: HttpClient) { }

  // Crear el método para hacer la petición 
  public getMovies(page: number, genreId?: number | null, selectedSort: string = 'popularity.desc'): Observable<APIresponse>{ 

    console.log(page, genreId, selectedSort);
    
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('include_adult', false)
      .set('include_video', false)
      .set('language', 'en-US')
      .set('page', page)
      .set('sort_by', selectedSort);
      //.set('with_genres', genreId ? genreId.toString() : '')
      //.set('sort_by', 'popularity.desc');

      //Con esta implementación, si selectedGenre es null, la URL de la solicitud no incluirá with_genres, y si tiene un valor, se incluirá con el valor convertido a cadena. 
      if (genreId !== null && genreId !== undefined) {
        params = params.set('with_genres', genreId.toString());
      }
      console.log(page, genreId, selectedSort);

    // Hacer la solicitud con GET y emitir el evento moviesUpdated cuando se complete
    return this.http.get<APIresponse>(`${this.API}discover/movie`, { params })
  }

  // YA NO CONECTA CON LA API THEMOVIEDB
  public getGenresList(): Observable<GenresList>{
    console.log('GenresList');
    return this.http.get<GenresList>(`${this.API}/genre/movie/list?api_key=${this.apiKey}`)
  }

  public getMovieDetails(movieId: number) : Observable<Movie> {
    return this.http.get<Movie>(`${this.API}/movie/${movieId}?api_key=${this.apiKey}`);
  }
}

// *** NOTAS *** //

  /*.pipe(
    tap((resp) => {
      const moviesWithMetadata = { movies: resp.results, page: resp.page, selectedGenre: this.selectedGenre };
      this.moviesUpdated.emit(moviesWithMetadata);
      //this.moviesUpdated.emit(resp.results); //.next si se usa BehaviorSubject
    })
  );*/

  //Observable<{ page: number, results: Movie[], total_pages: number ... }>

  /*if (this.selectedGenre !== null && this.selectedGenre !== undefined) {
    params = params.set('with_genres', this.selectedGenre.toString());
  }*/

  //private selectedGenre: number | null = null;

  /*public setSelectedGenre(genreId: number | null): void {
    this.selectedGenre = genreId;
  }*/

  /*public movieDetails(movieid: number) : Observable<Movie> {
    return this.http.get<Movie>(`${this.API}/movie/${movieid}?api_key=${this.apiKey}`);
  }*/

// Hacer la soicitud con GET y transformar el tipo de respuesta que da la API al formato en que la quiero manejar []
// return this.http.get<APIresponse>(`${this.API}discover/movie`, { params });
// return this.http.get<APIresponse>(`${this.API}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&sort_by=${selectedSort}&page=${page}`)
// return this.http.get<{results:Movie[]}>(`${this.API}discover/movie`, { params }).pipe(map((resp) => { return resp.results as Movie[] }));
// .pipe(map(...)) se puede eliminar porque el tipo especificado en get<{ }> ya coincide con la forma de la respuesta que se espera. Angular HttpClient ya realiza automáticamente el trabajo de convertir la respuesta JSON al tipo especificado. No es necesario mapear manualmente la respuesta ya que la infraestructura de HttpClient lo hace.

// Cambié EventEmitter por BehaviorSubject
//public moviesUpdated: EventEmitter<{ movies: Movie[]; page: number; selectedGenre: number | null }> = new EventEmitter<{ movies: Movie[]; page: number; selectedGenre: number | null }>();
//public moviesUpdated: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();
//public moviesUpdated = new BehaviorSubject<Movie[]>([]);
// Exponer el BehaviorSubject como observable público
//public moviesUpdated$ = this.moviesUpdated.asObservable();