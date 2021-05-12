import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/movie.interface';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-slideshow-pp',
  templateUrl: './slideshow-pp.component.html',
  styleUrls: ['./slideshow-pp.component.scss'],
})
export class SlideshowPpComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  @Output() addMovies = new EventEmitter();
  @Input() popular: Movie[] = [];

  slideOpts = {
    slidesPerView: 2.6,
    speed: 500,
    spaceBetween: -10,
    freeMode: true
  }

  nextPage(){
    this.addMovies.emit();
  }

  async showDetail(id: number){
    const modal= await this.modalCtrl.create({
      component: ModalComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
