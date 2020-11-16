import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
})
export class ConsultarComponent implements OnInit {
  ordenes: any;
  form:FormGroup;

  constructor(private api:ApiService,private router:Router) {
    this.form= new FormGroup({
      inicio:new FormControl(null),
      fin:new FormControl(null)
    })
   }

  ngOnInit() {}

  get(){
    this.api.certificadoTrabajo(this.form.value).subscribe((resp:any)=>{
          if(resp.ok){
            this.ordenes=resp.data;        
            console.log(this.ordenes);    
          }
    });
  }

  go(id){
    this.router.navigate([`/trabajo/generartrabajo/${id}`]);
  }



}
