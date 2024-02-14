import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movies';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  data: any;
  adult: boolean = true;
  backdrop_path: string = '';
  genre_ids: number[] = [];
  id: number = 0;
  original_language: string = '';
  original_title: string = '';
  overview: string = '';
  popularity: number = 0;
  poster_path: string = '';
  release_date: string = '';
  title: string = '';
  vote_average: number = 0;
  vote_count: number = 0;
  imageUrl!: SafeStyle;
  production_companies: any[] = []; 
  genres: any[] = [];

  constructor(private route: ActivatedRoute, private service: DataService) { }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    this.route.queryParams.subscribe(params => {
      const movieId = +params['id']; 
      this.service.getMovieDetails(movieId).subscribe(data => {
        this.data = data;
        this.production_companies = data.production_companies;
        this.genres = data.genres;
        const posterPath = this.data?.poster_path;
        this.imageUrl = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '../../../assets/not-available.png';
      })
    });
  }

  getLogoUrl(logoPath: string | null): string {
    if (logoPath) {
      return `https://image.tmdb.org/t/p/w154${logoPath}`;
    } else {
      return '../../../assets/not-available.png';
    }
  }
}
