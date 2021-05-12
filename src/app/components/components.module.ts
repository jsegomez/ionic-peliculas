import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Modulo de Pipes
import { PipesModule } from '../pipes/pipes.module';

// Componentes
import { SlideshowBdComponent } from './slideshow-bd/slideshow-bd.component';
import { SlideshowPpComponent } from './slideshow-pp/slideshow-pp.component';
import { TitlesComponent } from './titles/titles.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    SlideshowBdComponent,
    SlideshowPpComponent,
    TitlesComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [
    SlideshowBdComponent,    
    SlideshowPpComponent,
    TitlesComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }
