import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie, ResponseMDB } from '../interfaces/movie.interface';
import { MovieDetail } from '../interfaces/movie-detail.interface';
import { Cast } from '../interfaces/actor.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  private urlBase: string = environment.url;
  private apiKey: string = environment.apiKey;
  private lang: string = '&language=es-ES';

  private popularesPage: number = 0;
  private topRatedPage: number = 0;
  private upcomingPage: number = 0; 
  private pageSearch: number = 1; 

  private UrlNowPlayin: string = `${this.urlBase}/now_playing?api_key=${this.apiKey}${this.lang}&page=1`;
  private urlPopular: string = `${this.urlBase}/popular?api_key=${this.apiKey}${this.lang}&`;
  private urlTopRated: string = `${this.urlBase}/top_rated?api_key=${this.apiKey}${this.lang}&`;
  private urlUpcoming: string = `${this.urlBase}/upcoming?api_key=${this.apiKey}${this.lang}&`;
  private urlSearch: string = `${environment.urlSearch}?api_key=${this.apiKey}${this.lang}`;  

  getMovieSearch(query: string):Observable<Movie[]>{       
    return this.http.get<ResponseMDB>(`${this.urlSearch}&query=${query}&page=${this.pageSearch}&include_adult=false`).pipe(
      map((response: ResponseMDB)=>{        
        const movies: Movie[] = response.results;
        return movies;
      })
    );
  }

  getNowPlaying(): Observable<Movie[]> {
    return this.http.get<ResponseMDB>(this.UrlNowPlayin).pipe(
      map((response: ResponseMDB) => {        
        const movies: Movie[] = response.results;
        return movies;
      },
        catchError(e => throwError(e)))
    );
  }

  getPopular(): Observable<Movie[]> {
    this.popularesPage++;
    return this.http.get<ResponseMDB>(`${this.urlPopular}page=${this.popularesPage}`).pipe(
      map((response: ResponseMDB) => {
        const movies: Movie[] = response.results;
        return movies;
      },
        catchError(e => throwError(e))
      )
    );
  }

  getTopRated(): Observable<Movie[]> {
    this.topRatedPage++;
    return this.http.get<ResponseMDB>(`${this.urlTopRated}page=${this.topRatedPage}`).pipe(
      map((response: ResponseMDB) => {
        const movies: Movie[] = response.results;
        return movies;
      },
        catchError(e => throwError(e))
      )
    )
  }

  getUpcoming(): Observable<Movie[]> {
    this.upcomingPage++;
    return this.http.get<ResponseMDB>(`${this.urlUpcoming}page=${this.upcomingPage}`).pipe(
      map((response: ResponseMDB) => {
        const movies: Movie[] = response.results;
        return movies;
      },
        catchError(e => throwError(e))
      )
    )
  }

  getDetailsMovie(id: number) {
    return this.http.get<MovieDetail>(`${this.urlBase}/${id}?api_key=${this.apiKey}${this.lang}`).pipe(
      catchError(e => throwError(e))
    );
  }

  getCast(id: number): Observable<Cast[]>{
    return this.http.get<Cast[]>(`${this.urlBase}/${id}/credits?api_key=${this.apiKey}${this.lang}`).pipe(
      map((response: any) => {        
        const actors: Cast[] = response.cast;
        return actors;
      }),
      catchError(e => throwError(e))
    );
  }
}




