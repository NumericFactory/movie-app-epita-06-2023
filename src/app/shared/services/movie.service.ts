import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  TMDB_API = 'https://api.themoviedb.org/3';
  TMDB_APIKEY = environment.APIKEY_TMDB

  private _movies$ = new BehaviorSubject<MovieModel[]>([]);

  constructor(private http: HttpClient) { }

  /*
    getMoviesFromApi()
    rôle :> faire une request HTTP[GET] à l'API theMovieDB
          > et pousser la donnée :MovieModel[] dans le Subject _movies$
          url API : https://api.themoviedb.org/3
          endpoint : /discover/movie
          queryString : api_key:string, language:string, page:number
  */
  getMoviesFromApi(): void {
    let endpoint = '/discover/movie'
    let options = new HttpParams()
      .set('api_key', this.TMDB_APIKEY)
      .set('language', 'fr')
      .set('page', '1');

    this.http.get(this.TMDB_API + endpoint, { params: options })
      // on map notre réponse de TMDB en MovieModel[]
      .pipe(map((response: any) =>
        response.results.map((movie: any) => new MovieModel(movie))
      ))
      .subscribe(data => this._movies$.next(data))
  }

  /**
   * 
   * @param userInput 
   */
  searchMovie(userInput: string) {

  }









  /** getter/setter */
  get movies$(): Observable<MovieModel[]> {
    return this._movies$.asObservable();
  }




}
