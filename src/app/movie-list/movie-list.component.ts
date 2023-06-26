import { Component } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { MovieModel } from '../shared/models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {

  movies: MovieModel[] = [];

  constructor(private movieSvc: MovieService, private router: Router) { }

  ngOnInit() {
    // 1 faire la request GET à TMDB
    this.movieSvc.getMoviesFromApi()

    // 2 s'abonner à service.movies$
    this.movieSvc.movies$.subscribe(data => this.movies = data)

  }

  checkScore(score: number) {
    console.log(score)
  }

}
