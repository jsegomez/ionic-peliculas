import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/movie.interface';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-slideshow-bd',
  templateUrl: './slideshow-bd.component.html',
  styleUrls: ['./slideshow-bd.component.scss'],
})
export class SlideshowBdComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  slideOpts = {
    slidesPerView: 1,
    autoplay: true,
    speed: 400
  }

  @Input() nowPlaying: Movie[] = [];

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
