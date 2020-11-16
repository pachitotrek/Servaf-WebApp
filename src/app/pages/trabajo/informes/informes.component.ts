import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
})
export class InformesComponent implements OnInit {
  ordenes:any=[];

  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.getOrdenes();
  }

  getOrdenes(){
    // this.api.GetCloseOrden().subscribe((resp:any)=>{
    //   if(resp.ok){
    //     this.ordenes=resp.data;    
    //   }
    // });
  }

  



  open(id){
    this.router.navigate([`/trabajo/generar/${id}`],{ queryParams: { ok: '1' } });
  }

}
