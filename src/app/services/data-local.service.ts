import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

import { MovieDetail } from '../interfaces/movie-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(
    private storage: Storage ,
    private toastController: ToastController   
  ) {
    this.initDB();
    this.cargarFavoritos();
  }
  
  private _storage: Storage | null = null;  
  movies: MovieDetail[] = [];
  
  // Inicializando la base de datos
  async initDB(){    
    const storage = await this.storage.create();
    this._storage = storage;    
  }

  // Cargando favoritos
  async cargarFavoritos(){
    const movies = await this.storage.get('movies');
    this.movies = movies || [];    
    return movies;
  }

  // Mensajes TOAST
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1100
    });
    toast.present();
  }

  saveMovie(movie: MovieDetail){
    let exist: boolean = false;
    let message: string = '';

    for (let mv of this.movies) {      
      if(mv.id === movie.id){
        exist = true;
        break;
      }
    }

    if(exist){
      this.movies = this.movies.filter( mv => mv.id !== movie.id );
      message = 'Removida de favoritos';
      this.presentToast(message);
    }else{
      this.movies.push(movie);
      message = 'Agregada a favoritos';
      this.presentToast(message);      
    }
    
    this.storage.set('movies', this.movies);
    this.setNewMovie$.emit(true);
  }

  // Función para verificar si pelicula existe
  async existMovie(id: number){
    id = Number(id);        
    await this.cargarFavoritos()    
    const exist = this.movies.find(mv => mv.id === id);
    return (exist) ? true : false;
  }

  setNewMovie$ = new EventEmitter<boolean>();
}
