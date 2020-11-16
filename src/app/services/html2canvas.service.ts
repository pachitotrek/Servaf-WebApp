import { Injectable } from '@angular/core';
import { AuxService } from 'src/app/services/auxiliar.service';
import html2canvas from 'html2canvas'

@Injectable({
  providedIn: 'root'
})
export class Html2canvasService {

  constructor(private aux:AuxService) { }

  html2canvas(ele) {

    if (!ele) {
        return;
    }

    const option = {allowTaint: true, useCORS: true};
    return html2canvas(ele, option).then((canvas) => {
        if (canvas) {
            return canvas.toDataURL('image/png');
        }
        return null;
    }).catch((res) => {
        console.log(res);
        return res;
    });

    // if (!ele) {
    //     return;
    // }

    // const option = {allowTaint: true, useCORS: true};
    // return html2canvas(ele, option).then((canvas) => {
    //     if (canvas) {
    //         return canvas.toDataURL('image/png');
    //     }
    //     return null;
    // }).catch((res) => {
    //     console.log(res);
    //     return res;
    // });

}



}
