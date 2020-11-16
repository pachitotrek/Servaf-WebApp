import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listamedidores',
  templateUrl: './listamedidores.component.html',
  styleUrls: ['./listamedidores.component.scss'],
})
export class ListamedidoresComponent implements OnInit {
  form:FormGroup;
  items: any=[];
  
  constructor(private api:ApiService,private router:Router) {
    this.form= new FormGroup({
      serial:new FormControl(null)    
    })
   }


  ngOnInit() {
    this.get();
  }

  ionViewWillEnter() {
    this.get();
  }


  get(){
    this.api.getMedidores(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.items=resp.data;
        console.log(this.items);
      }
    })
  }



  download(id){
    this.router.navigate([`/trabajo/generar/${id}`]);
  }

  go(id){
    this.router.navigate([`/trabajo/informe/${id}`]);
  }

  godatos(id){
    this.router.navigate([`/trabajo/medidor/${id}`]);
  }

}
