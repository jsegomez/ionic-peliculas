import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { DataLocalService } from '../../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(
    private dataLocal: DataLocalService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.getFavorites();
    this.getNewMovies();
  }
  
  favoritesList: Movie[] = [];

  async getFavorites(){    
    this.favoritesList = await this.dataLocal.cargarFavoritos();    
  }

  getNewMovies(){
    this.dataLocal.setNewMovie$.subscribe(
      response => this.getFavorites()
    )
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
