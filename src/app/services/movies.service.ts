import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie, ResponseMDB } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  private popularesPage: number = 0;
  private topRatedPage: number = 0;  
  private upcomingPage: number = 0;
  private UrlNowPlayin: string = `${environment.url}/now_playing?api_key=${environment.apiKey}&language=es-US&page=1`;
  private urlPopular: string = `${environment.url}/popular?api_key=${environment.apiKey}&language=es-US&`;
  private urlTopRated: string = `${environment.url}/top_rated?api_key=${environment.apiKey}&language=es-US&`;
  private urlUpcoming: string = `${environment.url}/upcoming?api_key=${environment.apiKey}&language=es-US&`;
  
    

  getNowPlaying(): Observable<Movie[]>{
    return this.http.get<ResponseMDB>(this.UrlNowPlayin).pipe(
      map( (response: ResponseMDB) => {
        const movies: Movie[] = response.results;
        return movies;
      })
    );
  }

  getPopular(): Observable<Movie[]>{
    this.popularesPage++;    
    return this.http.get<ResponseMDB>(`${this.urlPopular}page=${this.popularesPage}`).pipe(
      map( (response: ResponseMDB) => {
        const movies: Movie[] = response.results;        
        return movies;
      })      
    );    
  }

  getTopRated(): Observable<Movie[]>{
    this.topRatedPage++;
    return this.http.get<ResponseMDB>(`${this.urlTopRated}page=${this.topRatedPage}`).pipe(
      map( (response: ResponseMDB) => {
        const movies: Movie[] = response.results;
        return movies;
      })
    )
  }

  getUpcoming(): Observable<Movie[]>{
    this.upcomingPage++;
    return this.http.get<ResponseMDB>(`${this.urlUpcoming}page=${this.upcomingPage}`).pipe(
      map( (response: ResponseMDB) => {
        const movies: Movie[] = response.results;
        return movies;
      })
    )
  }
}




