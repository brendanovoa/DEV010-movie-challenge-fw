import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FiltersComponent } from './views/filters/filters.component';
import { MovieDetailsComponent } from './views/movie-details/movie-details.component';
import { MoviesComponent } from './views/movies/movies.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'filters', component: FiltersComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movieDetails', component: MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
