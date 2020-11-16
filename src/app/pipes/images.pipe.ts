import { Pipe, PipeTransform } from '@angular/core';
import { Global } from '../services/global';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,tipo:string ='usuario'): any {

    let url= Global.url+'img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'medidor':
        url += '/medidor/' + img;
      break;

      case 'video':
        url += '/videos/' + img;
      break;

      case 'logo':
        url += '/logo/' + img;
      break;

      case 'cover':
        url += '/cover/' + img;
      break;

      case 'gallery':
        url += '/gallery/' + img;
      break;

      case 'profile':
        url += '/profile/' + img;
      break;

      case 'publicidad':
        url += '/publicidad/' + img;
      break;

      case 'tienda':
         url += '/tienda/' + img;
      break;
      
      case 'videos':
          url = Global.url + 'stream/' + img;
        //  url += '/videos/' + img;
      break;

      default:
        console.log('Error no se encuentra imagen');
        url += '/usurios/xxx';
    }



    return url;
  }

}
