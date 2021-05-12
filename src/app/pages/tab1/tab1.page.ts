import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.getNowPlayin();
    this.getPopular();
    this.getTopRated();
    this.getUpcoming();
  }

  nowPlaying: Movie[] = [];
  popular: Movie[] = [];
  topRated: Movie[] = [];
  latestMovies: Movie[] = [];
  upComing: Movie[] = [];

  getNowPlayin(){
    this.moviesService.getNowPlaying().subscribe(
      response => {
        this.nowPlaying = response;        
      }
    )
  }  

  getPopular(){
    this.moviesService.getPopular().subscribe(
      response => {
        if(response){
          this.popular.push(...response)
        }
      }
    )
  }

  getTopRated(){
    this.moviesService.getTopRated().subscribe(
      response => {
        if(response){
          this.topRated.push(...response)
        }
      }
    )
  }

  getUpcoming(){
    this.moviesService.getUpcoming().subscribe(
      response => {
        if(response){
          this.upComing.push(...response)
        }
      }
    )
  }

  addMovies(select: string){
    if(select == 'popular'){
      this.getPopular();
    }else if(select == 'top'){
      this.getTopRated();
    }else if(select == 'upcoming'){
      this.getUpcoming();
    }
  }

}
