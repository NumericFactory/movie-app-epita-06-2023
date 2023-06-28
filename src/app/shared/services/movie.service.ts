import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { environment } from '../../../environments/environment';


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

  /*
    searchMovies()
    rôle :> faire une request HTTP[GET] à l'API theMovieDB
          url API : https://api.themoviedb.org/3
          endpoint : /search/movie
          queryString : query:string api_key:string, language:string
          (le paramètre nommé query a pour valeur la saisie de l'utilisateur)
  */
  searchMovie(userInput: string): Observable<MovieModel[]> {
    let endpoint = '/search/movie';
    let options = new HttpParams()
      .set('api_key', 'this.TMDB_APIKEY')
      .set('language', 'fr')
      .set('query', userInput);
    return this.http.get(this.TMDB_API + endpoint, { params: options })
      .pipe(map((response: any) =>
        response.results.map((movie: any) => new MovieModel(movie))
      ))

  }

  /**
   * getDetails()
   * Role : faire une request HTTP[GET] à l'API theMovieDB
          url API : https://api.themoviedb.org/3
          endpoint : /movie/{id}
          queryString : api_key:string, language:string
   */
  getDetails(id: number): Observable<MovieModel> {
    let endpoint: string = '/movie/' + id;
    let options = new HttpParams()
      .set('api_key', this.TMDB_APIKEY)
      .set('language', 'fr');
    return this.http.get(this.TMDB_API + endpoint, { params: options })
      .pipe(
        map(response => new MovieModel(response))
      ) // en sortie de pipe, on a un Observable
  }


  /**
   * getVideos()
   * Role : faire une request HTTP[GET] à l'API theMovieDB
          url API : https://api.themoviedb.org/3
          endpoint : /movie/{id}/videos
          queryString : api_key:string, language:string
   */
  getVideos(id: number): Observable<any> {
    let endpoint: string = '/movie/' + id + '/videos';
    let params = new HttpParams()
      .set('api_key', this.TMDB_APIKEY)
      .set('language', 'fr');
    return this.http.get(this.TMDB_API + endpoint, { params })
  }







  /** getter/setter */
  get movies$(): Observable<MovieModel[]> {
    return this._movies$.asObservable();
  }

  setMovies$(data: MovieModel[]) {
    this._movies$.next(data)
  }




}
