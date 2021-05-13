import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetail } from '../../interfaces/movie-detail.interface';
import { Cast } from '../../interfaces/actor.interface';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(
    private movieService: MoviesService,
    private modalController: ModalController,
    private dataLocal: DataLocalService,    
  ) { }

  async ngOnInit() {
    this.getDetailsMovie();
    this.getCast();
    this.existMovieFav = await this.dataLocal.existMovie(this.id);    
  }

  @Input() id;
  movieDetails: MovieDetail;
  existMovieFav: boolean = false;
  cast: Cast[] = [];
  slideActores = {
    slidesPerView: 3,
    freeMode: true,
    spaceBetween: -10
  }

  getDetailsMovie(){
    this.movieService.getDetailsMovie(this.id).subscribe(
      response => this.movieDetails = response
    );
  }

  getCast(){
    this.movieService.getCast(this.id).subscribe(
      response => this.cast = response
    );
  }

  returnPage(){
    this.modalController.dismiss();
  }

  async favoritos(){
    await this.dataLocal.saveMovie(this.movieDetails);
    this.existMovieFav = await this.dataLocal.existMovie(this.movieDetails.id);    
  }

}
