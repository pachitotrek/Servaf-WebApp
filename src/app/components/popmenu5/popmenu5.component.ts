import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popmenu5',
  templateUrl: './popmenu5.component.html',
  styleUrls: ['./popmenu5.component.scss'],
})
export class Popmenu5Component implements OnInit {
  normal=[
    {id:1,titulo:'Instrumentos Predeterminados',link:'instrumentos'},
    {id:2,titulo:'Parametros Predeterminados',link:'parametros'}
  ];

  constructor(private router:Router) { }

  ngOnInit() {}

  nav(item){
    this.router.navigate([`/configuracion/${item}`])
  }


}
