import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.scss'],
})
export class CertificadosComponent implements OnInit {
  ordenes:any=[];
  form:FormGroup;

  constructor(private api:ApiService,private router:Router) {
    this.form= new FormGroup({
      inicio:new FormControl(null),
      fin:new FormControl(null)
    })
   }

  ngOnInit() {
    this.getOrdenes();
  }

  
  getOrdenes(){
    this.api.GetCloseOrden(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.ordenes=resp.data;
      }
    });
  }

  open(id){
    this.router.navigate([`/trabajo/certificados/${id}`]);
  }

}
