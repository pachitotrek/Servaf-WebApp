import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuxService {
  isLoading = false;
  isAlert = false;
  constructor(public loadingController: LoadingController,public alertController:AlertController) { }

  async createLoading() {
    this.isLoading = true;

    const loading = await this.loadingController.create({
      message: 'Please wait...'    
    });    
    return await loading.present();
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  HideLoading() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 100);
  }

  async createAlert(a:any,b:any) {
    this.isAlert = true;
    const loading = await this.alertController.create({
      header: a,  
      mode:'ios',
      message: b,
      buttons: ['OK']   
    });    
    return await loading.present();
  }

  async dismissAlert() {
    this.isAlert = false;
    return await this.alertController.dismiss().then(() => console.log('dismissed'));
  }

  HideAlert() {
    setTimeout(() => {
      this.alertController.dismiss();
    }, 100);
  }




  
}
