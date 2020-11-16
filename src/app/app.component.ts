import { Component } from '@angular/core';

import { Platform, MenuController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    { title: "Inicio", link: "home" },
    { title: "Usuarios", link: "usuarios" },
    { title: "Mi Usuario", link: "usuario" },
    { title: "Clientes", link: "clientes" },
    { title: "O.Entrada", link: "ordenes" },
    { title: "O.Trabajo", link: "trabajo" },
    { title: "Ensayos", link: "ensayos" },
    { title: "Instrumentos", link: "instrumentos" },
    { title: "Configuracion", link: "configuracion" } 
  ];
  device: any;
  active: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events:Events,
    public menu:MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.device=this.platform.width();  
      this.getDevice(this.device);
    });
  }

  menuToogle(){
    this.events.subscribe('menu:toogle', () => {      
      // user and time are the same arguments passed in `events.publish(user, time)`
       if(this.menu.isOpen){            
        this.active=true;
       }else{
         this.active=false;
       } 
    });
  }

  getDevice(width){
    if(width < 1024 ){
      this.active=true;
    }
    if(width > 1025 ){
      this.active=false;
    }
  }


}
