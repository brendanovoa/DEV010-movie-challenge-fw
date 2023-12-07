import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../shared/interfaces/movies';

@Injectable({
    providedIn: 'root',
})
export class PaginationService {
    private currentPageSubject = new BehaviorSubject<number>(1);
    currentPage$ = this.currentPageSubject.asObservable();

    private moviesSubject = new BehaviorSubject<Movie[]>([]);
    movies$ = this.moviesSubject.asObservable();

    updatePage(page: number) {
        this.currentPageSubject.next(page);
    }

    updateMovies(movies: Movie[]) {
        this.moviesSubject.next(movies);
    }
}
