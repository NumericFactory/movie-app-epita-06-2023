import { Component } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { MovieModel } from '../shared/models/movie.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {

  movies: MovieModel[] = [];
  sub!: Subscription;

  constructor(public movieSvc: MovieService, private router: Router) { }

  ngOnInit() {
    // 1 faire la request GET à TMDB
    this.movieSvc.getMoviesFromApi()

    // 2 s'abonner à service.movies$
    // this.sub = this.movieSvc.movies$.subscribe(data => {
    //   console.log('Hello')
    //   this.movies = data
    // })

  }

  checkScore(score: number) {
    console.log(score)
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe()
  // }



}
