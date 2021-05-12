import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-slideshow-pp',
  templateUrl: './slideshow-pp.component.html',
  styleUrls: ['./slideshow-pp.component.scss'],
})
export class SlideshowPpComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Output() addMovies = new EventEmitter();

  @Input() popular: Movie[] = [];

  slideOpts = {
    slidesPerView: 2.5,
    speed: 500,
    spaceBetween: -10,
    freeMode: true
  }

  nextPage(){
    this.addMovies.emit();
  }

}
