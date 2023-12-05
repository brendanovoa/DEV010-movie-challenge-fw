import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie, APIresponse } from 'src/app/shared/interfaces/movies';

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
  public getMovies(page: number): Observable<APIresponse>{ 
 
  //genreId: string, selectedSort: string
  //Observable<{ page: number, results: Movie[], total_pages: number ... }>
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('include_adult', false)
      .set('include_video', false)
      .set('language', 'en-US')
      .set('page', page)
      //.set('with_genres', genreId)
      //.set('sort_by', selectedSort);
      .set('sort_by', 'popularity.desc');

      // Hacer la soicitud con GET y transformar el tipo de respuesta que da la API al formato en que la quiero manejar []
      return this.http.get<APIresponse>(`${this.API}discover/movie`, { params });
      // return this.http.get<{results:Movie[]}>(`${this.API}discover/movie`, { params }).pipe(map((resp) => { return resp.results as Movie[] }));

      // .pipe(map(...)) se puede eliminar porque el tipo especificado en get<{ }> ya coincide con la forma de la respuesta que se espera. Angular HttpClient ya realiza automáticamente el trabajo de convertir la respuesta JSON al tipo especificado. No es necesario mapear manualmente la respuesta ya que la infraestructura de HttpClient lo hace.
  }
}