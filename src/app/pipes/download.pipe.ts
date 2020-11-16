import { Pipe, PipeTransform } from '@angular/core';
import { Global } from '../services/global';

@Pipe({
  name: 'download'
})
export class DownloadPipe implements PipeTransform {

  transform(img: string,tipo:string ='usuario'): any {

    let url= Global.url+'down';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'images':
        url += '/images/' + img;
      break;

      default:
        console.log('Error no se encuentra imagen');
        url += '/usurios/xxx';
    }










    return url;
  }

}
