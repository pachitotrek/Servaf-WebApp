import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss'],
})
export class InformeComponent implements OnInit {
  id: string;
  orden: any=[];
  medidores:any=[];
  status:boolean=true;


  constructor(private route:ActivatedRoute,private api:ApiService,private titleService: Title) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getOrden(this.id);
    this.getMedidores(this.id);
  }

  getOrden(id){
    this.api.certificadoOrden(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.orden=resp.data[0];    
      }
    })

  }

  getMedidores(id){
    this.api.certificadoOrdenMedidores(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.medidores=resp.data;
        console.log(this.medidores);

      }
    })
  }

  changeTitle(id){
    this.titleService.setTitle(id);
  }

  print(){   
    let titulo=`OE-LMC-${this.orden.orden}`;
    this.changeTitle(titulo);
    window.print();
    this.changeTitle('ServafAPP');  
  }

}
