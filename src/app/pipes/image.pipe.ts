import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, size: string = 'w500'): string {

    if(!image){
      return 'https://sinapsis.uao.edu.co/wp-content/uploads/sites/13/2020/04/0.png';
    }

    const url = `${environment.imgPath}${size}${image}`;
    return url;
  }

}
