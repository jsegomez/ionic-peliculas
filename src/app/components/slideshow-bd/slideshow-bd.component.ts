import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-slideshow-bd',
  templateUrl: './slideshow-bd.component.html',
  styleUrls: ['./slideshow-bd.component.scss'],
})
export class SlideshowBdComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() nowPlaying: Movie[] = [];

  slideOpts = {
    slidesPerView: 1,
    autoplay: true,
    speed: 400
  }

}
