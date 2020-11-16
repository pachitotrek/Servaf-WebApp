import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss'],
})
export class OrdenesComponent implements OnInit {
  ordenes:any=[];
  form: FormGroup;

  constructor(private api:ApiService,private router:Router) {
    this.form= new FormGroup({
      inicio:new FormControl(null),
      fin:new FormControl(null)
    })
   }

  ngOnInit() {
    this.getOrdenes();
  }

  ionViewWillEnter() {
    this.getOrdenes();
  }

  getOrdenes(){
    this.api.getOrdenesTrabajo().subscribe((resp:any)=>{
      if(resp.ok){
        this.ordenes=resp.data;
      }
    });
  }

  

  open(id){
    this.router.navigate([`/trabajo/pruebas/${id}`]);
  }


}
