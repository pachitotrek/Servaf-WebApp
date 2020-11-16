import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calibrar',
  templateUrl: './calibrar.component.html',
  styleUrls: ['./calibrar.component.scss'],
})
export class CalibrarComponent implements OnInit {
  ordenes:any=[];

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.getOrdenes();
  }

  getOrdenes(){
    // this.api.getOrdenesOpenTrabajo().subscribe((resp:any)=>{
    //   if(resp.ok){
    //     this.ordenes=resp.data;
    //     console.log(this.ordenes);
    //   }
    // });
  }

  open(id){
    this.router.navigate([`/trabajo/pruebas/${id}`]);
  }


}
