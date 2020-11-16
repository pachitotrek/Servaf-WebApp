import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form:FormGroup;
  
  constructor(private us:UserService,private router:Router,private local:LocalStorageService,public loadingController: LoadingController,public alertController: AlertController) {
    this.form= new FormGroup({
      username: new FormControl(null,Validators.required),
      pass: new FormControl(null,Validators.required)
    });
   }

  ngOnInit() {
  }

  login(){
    this.cargando();
    this.us.login(this.form.value).subscribe(async (resp:any)=>{
        if(resp){
          let close = await this.hideLoader();
          this.us.cargarStorage();
          this.router.navigate(['/inicio']); 
        }
    },async (error:any)=>{
      let close = await this.hideLoader();
      this.form.reset();
      setTimeout(() => {
        this.presentAlert();        
      }, 500);
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Ingresando por favor espere !!'      
    });
    await loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      mode:'ios',
      cssClass:'primary',
      subHeader: 'Credenciales Incorrectas',
      message: 'Haz Ingresado las credenciales incorrectas intenta nuevamente o pide soporte con el administrador.',
      buttons: ['OK']
    });

    await alert.present();
  }

  cargando(){
    this.presentLoading();
  }

  async hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
      return true;
    }, 1000);
  }

  redirect(){
    setTimeout(() => {
      this.loadingController.dismiss();
      this.us.cargarStorage();
      this.router.navigate(['/inicio']); 
    }, 1000);

  }



}
