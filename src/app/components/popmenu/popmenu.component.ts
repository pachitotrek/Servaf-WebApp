import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss'],
})
export class PopmenuComponent implements OnInit {
  user:any=[];
  normal=[
    { pagina: "Inicio", link: "/home" },
    { pagina: "Usuarios", link: "/usuarios" },
    { pagina: "Clientes", link: "/clientes" },
    { pagina: "O.Entrada", link: "/ingreso/nuevo" },
    { pagina: "O.Trabajo", link: "/trabajo" },  
    { pagina: "Instrumentos", link: "/instrumentos/consultar" },
    { pagina: "Manual", link: "/manual" }
  ];

  menu:any=[];
  constructor(private local:LocalStorageService,private us:UserService,private router:Router) { }

  ngOnInit() {
    this.checkState();
  }

  checkState(){
    this.local.cargarStorage('usuario').then((data)=>{
      this.user=data;
      this.menu=this.normal;   
    }).catch((error)=>{
    
    
    });
  }

  make(item){
    if(item.id==6){
      this.us.logout(); 
      window.location.reload();
    }else{
      this.router.navigate([item.link]);
    }
 
  }

}
