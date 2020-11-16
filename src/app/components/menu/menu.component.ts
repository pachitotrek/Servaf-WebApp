import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, LoadingController, PopoverController } from '@ionic/angular';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PopmenuComponent } from '../popmenu/popmenu.component';
import { Popmenu2Component } from '../popmenu2/popmenu2.component';
import { Popmenu3Component } from '../popmenu3/popmenu3.component';
import { Popmenu4Component } from '../popmenu4/popmenu4.component';
import { Popmenu5Component } from '../popmenu5/popmenu5.component';
import { Popmenu6Component } from '../popmenu6/popmenu6.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  data_menu = [
    { pagina: "Inicio", link: "home" },
    { pagina: "Usuarios", link: "usuarios" },
    { pagina: "Mi Usuario", link: "usuario" },
    { pagina: "Clientes", link: "clientes" },
    { pagina: "O.Entrada", link: "ingreso" },
    { pagina: "O.Trabajo", link: "trabajo" },
    { pagina: "Calibracion", link: "ensayos" },
    { pagina: "Instrumentos", link: "instrumentos" },
    { pagina: "Configuracion", link: "configuracion" },
    { pagina: "Manual", link: "manual" },
  ];
  data_admin = [
    { pagina: "Inicio", link: "home" },
    { pagina: "Usuarios", link: "usuarios" },
    { pagina: "Mi Usuario", link: "usuario" },
    { pagina: "Clientes", link: "clientes" },
    { pagina: "O.Entrada", link: "ingreso" },
    { pagina: "O.Trabajo", link: "trabajo" },
    { pagina: "Calibracion", link: "ensayos" },
    { pagina: "Instrumentos", link: "instrumentos" },
    { pagina: "Configuracion", link: "configuracion" },
    { pagina: "Manual", link: "manual" },
  ];
  

  auth2: any = [];
  login: boolean;
  usuario: any = [];
  menu: any = [];

  constructor(private router: Router, private events: Events, private menu_c: MenuController,
    private userService: UserService, public loadingController: LoadingController, private local: LocalStorageService,
    public popoverController: PopoverController) {
    this.menu=this.data_menu;
    this.checkState();

    this.userService.status$.subscribe((data) => {
      // this.menu=this.data_menu_dos;
      this.checkState();       
    });
  }

  ngOnInit() {
    this.checkState();
  }

  nav(item) {
    if(item=="ingreso"){
      this.popmenu2(event);
    }else if(item=="trabajo"){
     this.popmenu3(event);
    }else if(item=="instrumentos"){
      this.popmenu4(event);
    }else if(item=="configuracion"){
      this.popmenu5(event);
    } else if(item=="ensayos"){
      this.popmenu6(event);
    }else{
      this.router.navigate([`/${item}`]);
    }
  }

  // 


  menutoogle() {    
    this.events.publish('menu:toogle');
    this.menu_c.open();
  }



  async  checkState() {
    let status = await this.userService.Logeado();  
    if(status){      
      this.usuario = await this.local.cargarStorage('usuario').then((data:any)=>{
          return data;
      }).catch((err:any)=>{
          return null;
      });
      if(this.usuario){
        this.login=true;
      }
      if(this.usuario.role==2){
        this.menu=this.data_admin;
      }else{
        this.menu=this.data_menu;
      }   
    }else{
      this.login=false;
    } 
  }

  async popmenu(ev: any) {
    const popover = await this.popoverController.create({
      component: PopmenuComponent,
      event: ev,
      mode: 'ios',
      translucent: true
    });
    return await popover.present();
  }
  async popmenu2(ev: any) {
    const popover = await this.popoverController.create({
      component: Popmenu2Component,
      event: ev,
      mode: 'ios',
      translucent: true
    });
    return await popover.present();
  }
  async popmenu3(ev: any) {
    const popover = await this.popoverController.create({
      component: Popmenu3Component,
      event: ev,
      mode: 'ios',
      translucent: true
    });
    return await popover.present();
  }
  async popmenu4(ev: any) {
    const popover = await this.popoverController.create({
      component: Popmenu4Component,
      event: ev,
      mode: 'ios',
      translucent: true
    });
    return await popover.present();
  }
  async popmenu5(ev: any) {
    const popover = await this.popoverController.create({
      component: Popmenu5Component,
      event: ev,
      mode: 'ios',
      translucent: true
    });
    return await popover.present();
  }
  async popmenu6(ev: any) {
    const popover = await this.popoverController.create({
      component: Popmenu6Component,
      event: ev,
      mode: 'ios',
      translucent: true
    });
    return await popover.present();
  }









}
