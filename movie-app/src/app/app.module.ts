import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { ButtonComponent } from './components/button/button.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsComponent } from './views/movie-details/movie-details.component';
import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HomeComponent,
    FiltersComponent,
    MoviesComponent,
    MovieDetailsComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
