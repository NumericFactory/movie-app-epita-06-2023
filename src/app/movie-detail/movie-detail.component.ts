import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {

  movieId!: number;

  constructor(
    private route: ActivatedRoute,
    private movieSvc: MovieService
  ) { }

  ngOnInit() {
    // je VEUX récupérer movieId du movie en param dans l'URL
    console.log(this.route.snapshot.params['movieId']) // {movieId: '123456'}
    this.movieId = this.route.snapshot.params['movieId'];

    // faire la request 1 : /movie/{id}
    // https://developer.themoviedb.org/reference/movie-details
    // (coder la méthode getDetails() dans movie.service.ts)
    this.movieSvc.getDetails(this.movieId).subscribe(data => {
      console.log(data)
    });






    // faire la request 2: /movie/{id}/videos
    // https://developer.themoviedb.org/reference/movie-videos
    // (coder la méthode getVideos() dans movie.service.ts)
  }

}
