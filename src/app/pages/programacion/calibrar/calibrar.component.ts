import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-calibrar',
  templateUrl: './calibrar.component.html',
  styleUrls: ['./calibrar.component.scss'],
})
export class CalibrarComponent implements OnInit {
  orden:any=[];
  medidores:any=[];
  id: string;

  constructor(private route:ActivatedRoute,private api:ApiService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getOrden(this.id);
  }

  getOrden(id){
    this.api.GetOrdenClosed(id).subscribe((resp:any)=>{
        if(resp.ok){
          this.orden=resp.data[0];
          console.log(this.orden);
          this.medidores=this.orden.medidores;
        
        }
    });
  }

  








}
