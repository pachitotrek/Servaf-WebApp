import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popmenu2',
  templateUrl: './popmenu2.component.html',
  styleUrls: ['./popmenu2.component.scss'],
})
export class Popmenu2Component implements OnInit {
  normal=[
    {id:1,titulo:'Agregar Medidores',link:'nuevo'},
    {id:2,titulo:'Consultar',link:'consultar'}
  ];

  constructor(private router:Router) { }

  ngOnInit() {}

  nav(item){
    this.router.navigate([`/ingreso/${item}`])
  }

}
