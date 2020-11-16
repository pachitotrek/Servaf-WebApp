import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
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
    this.api.getingresos(this.form.value).subscribe((resp:any)=>{
          if(resp.ok){
            this.ordenes=resp.data;
            console.log(this.ordenes);
          }
    });
  }

  go(id){
    this.router.navigate([`/ingreso/informe/${id}`]);
  }





}
