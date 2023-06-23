import { Component } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { MovieModel } from '../shared/models/movie.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  // variable d'affichage
  movieResults: MovieModel[] = [];

  constructor(private movieSvc: MovieService) { }

  onKeyupInput(inputStr: string) {
    this.movieSvc.searchMovie(inputStr)
      .subscribe(data => this.movieResults = data)
  }

}
