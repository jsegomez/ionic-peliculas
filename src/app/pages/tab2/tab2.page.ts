import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  movieResults: Movie[] = [];
  isSearching: boolean = false;
  textSearch: string = '';

  search(event: any){    
    const valor = event.detail.value;
    if(!valor){
      this.movieResults = [];
      this.isSearching = false;
      return;
    }else{
      this.isSearching = true;
      this.moviesService.getMovieSearch(valor.trim()).subscribe(
        response => {
          this.movieResults = response;
          this.isSearching = false;       
        }
      );
    }
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
