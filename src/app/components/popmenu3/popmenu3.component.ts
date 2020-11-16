import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popmenu3',
  templateUrl: './popmenu3.component.html',
  styleUrls: ['./popmenu3.component.scss'],
})
export class Popmenu3Component implements OnInit {
  normal=[
    {id:1,titulo:'Crear Orden',link:''},
    {id:2,titulo:'Calibrar',link:'ordenes'},
    {id:2,titulo:'Ordenes Finalizadas',link:'finalizadas'},
    {id:2,titulo:'Consultar Ordenes',link:'consultar'},
    {id:2,titulo:'Medidores Calibrados',link:'lista'},    
  ];

  constructor(private router:Router) { }

  ngOnInit() {}

  nav(item){
    this.router.navigate([`/trabajo/${item}`])
  }

}
