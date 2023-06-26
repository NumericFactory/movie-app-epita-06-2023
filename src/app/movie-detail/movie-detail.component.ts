import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // je VEUX récupérer movieId du movie en param dans l'URL
    console.log(this.route.snapshot.params['movieId']) // {movieId: '123456'}

  }

}
