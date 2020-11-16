import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popmenu6',
  templateUrl: './popmenu6.component.html',
  styleUrls: ['./popmenu6.component.scss'],
})
export class Popmenu6Component implements OnInit {
  normal=[
    {id:1,titulo:'Crear Banco',link:'ensayos'},
    {id:2,titulo:'Consultar Banco',link:'updatebanco'}
  ];

  constructor(private router:Router) { }

  ngOnInit() {}

  nav(item){  
      this.router.navigate([`/${item}`]);
  }


}
