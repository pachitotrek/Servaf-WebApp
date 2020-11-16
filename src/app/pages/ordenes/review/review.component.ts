import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  id:string="";
  medidores: any=[];
  orden: any=[];

  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get("id");
    this.getMedidores(this.id);
    this.getOrden(this.id);
  }

  getMedidores(id){
    // this.api.getMedidoresOrden(id).subscribe((resp:any)=>{
    //   if(resp.ok){
    //     this.medidores=resp.data;        
    //   }
    // })
  }

  getOrden(id){
    this.api.getOrden(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.orden=resp.data[0];  
        console.log(this.orden);      
      }
    })
  }

  continue(){
    this.router.navigate(['/home']);
  }







}
