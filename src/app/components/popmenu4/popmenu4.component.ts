import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popmenu4',
  templateUrl: './popmenu4.component.html',
  styleUrls: ['./popmenu4.component.scss'],
})
export class Popmenu4Component implements OnInit {
  normal=[
    {id:1,titulo:'Crear Instrumento',link:'crear'},
    {id:2,titulo:'Consultar',link:'consultar'},
    {id:2,titulo:'Set Errores',link:'set'}
  ];

  constructor(private router:Router) { }

  ngOnInit() {}

  nav(item){
    this.router.navigate([`/instrumentos/${item}`])
  }


}
