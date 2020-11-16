import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  menu:any= [
    {
      id: 1, titulo: "Usuarios", descripcion:" Administre Usuarios cree,edite y asigne roles especificos", nav: "/usuarios"
    },
    {
      id: 1, titulo: "Clientes", descripcion: " Administre Sus cliente agregue nuevos clientes", nav: "/clientes"
    },
    {
      id: 1, titulo: "Ordenes de Entrada", descripcion: " Creee una nueva orden de entrada", nav: "/ingreso/nuevo"
    },  
    {
      id: 1, titulo: "Ordenes de Trabajo", descripcion: " Administre sus configuraciones por defecto", nav: "/trabajo"
    },
    {
      id: 1, titulo: "Instrumentos", descripcion: "Agregue instrumentos para poder utilizarlos en la plataforma", nav: "/instrumentos/consultar"
    },
    {
      id: 1, titulo: "Banco de Calibracion", descripcion: "Agregue bancos de calibracion para poder utilizarlos en la plataforma", nav: "/ensayos"
    },
    {
      id: 1, titulo: "Manual de la Aplicacion", descripcion: "Consulte el Manual de la aplicacion", nav: "/manual"
    },
  ];

  constructor(private router:Router) { }

  ngOnInit() {}

  nav(item){
    this.router.navigate([`${item}`]);
  }

}
