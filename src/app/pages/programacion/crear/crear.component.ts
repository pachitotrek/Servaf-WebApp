import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {
  medidores:Array<any>=[];
  select:Array<any>=[];

  constructor(private api:ApiService,private local:LocalStorageService,private router:Router) { }

  ngOnInit() {
    this.getMedidores();
  }

  ionViewWillEnter() {
    this.getMedidores();
  }

  getMedidores(){
    this.api.getMedidoresSave().subscribe((resp:any)=>{
        if(resp.ok){
          this.medidores=resp.data;              
        }
    })
  }

  push(item){
    this.select.push(item);
    this.medidores=this.medidores.filter(e=>e._id != item._id);  
  }

  delete(item){
    this.select = this.select.filter(e=>e._id != item._id);
    this.medidores.push(item);
  }

  next(){
    this.local.SaveStorage('medidores',this.select);
    this.router.navigate(['/trabajo/generales']);    
  }

}
