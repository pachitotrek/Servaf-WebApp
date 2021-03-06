import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
})
export class ConsultarComponent implements OnInit {
  ordenes:any=[];

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.getOrdenes();
  }

  getOrdenes(){
    this.api.getOrdenesOpen().subscribe((resp:any)=>{
      if(resp.ok){
        this.ordenes=resp.data;
      }
    });
  }

  open(id){
    this.router.navigate([`/trabajo/open/${id}`]);
  }


}
