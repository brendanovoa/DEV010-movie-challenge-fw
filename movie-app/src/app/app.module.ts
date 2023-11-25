import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { ButtonComponent } from './components/button/button.component';
import { FiltersComponent } from './views/filters/filters.component';
import { MoviesComponent } from './views/movies/movies.component';
import { MovieDetailsComponent } from './views/movie-details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HomeComponent,
    FiltersComponent,
    MoviesComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
