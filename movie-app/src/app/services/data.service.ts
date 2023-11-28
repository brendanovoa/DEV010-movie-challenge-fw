import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from 'src/app/shared/interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Definir el Endpoint al que conectarse
  private API = 'https://api.themoviedb.org/3/';
  private apiKey = '3bf3e2fd0b4078b4ce8778ca08a057cd';

  // Inicializar el constructor httpclient
  constructor(private http: HttpClient) { }

  // Crear el método para hacer la petición 
  public getMovies(): Observable<Movie[]>{
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('include_adult', false)
      .set('include_video', false)
      .set('language', 'en-US')
      // .set('page', page)
      .set('sort_by', 'popularity.desc');

      // Hacecr a soicitud con GET y transformar el tipo de respuesta que da la API al formato en que la quiero manejar []
      return this.http.get<{results:Movie[]}>(`${this.API}discover/movie`, { params }).pipe(map((resp) => { return resp.results as Movie[] }));
      // return this.http.get(this.API).pipe(map((resp:any)=>{return resp.results as Movie[]}));
      // return this.http.get(`${this.API}discover/movie`, { params });
  }
}