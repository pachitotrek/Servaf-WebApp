import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addmedidores',
  templateUrl: './addmedidores.component.html',
  styleUrls: ['./addmedidores.component.scss'],
})
export class AddmedidoresComponent implements OnInit {
  medidores:any=[];
  seleccionados:any=[];
  id: string;
  datos: any;
  tipo: string;
  state: boolean=false;

  constructor(private api:ApiService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getTrabajo(this.id);
   
  }


  getTrabajo(id){
    // this.api.GetOpenOrden(id).subscribe((resp:any)=>{
    //   if(resp.ok){
    //     this.datos=resp.data[0];
    //     console.log(this.datos);
    //     this.getMedidores(this.datos.entrada._id);
    //     if(this.datos.tipo==1){
    //       this.tipo="Calibracion";
    //     }else if(this.datos.tipo==2){
    //       this.tipo="Perdida de Carga";
    //     }else{
    //       this.tipo="Presion Hidroestatica";
    //     }
    //     this.state=true;
    //     console.log(this.datos.orden);
    //   }
    // });
  }


  getMedidores(id){
    // this.api.getMedidoresOrden(id).subscribe((resp:any)=>{
    //   if(resp.ok){
    //     this.medidores=resp.data;
    //     console.log(this.medidores);
    //   }
    // });
  }

  push(item){
    this.seleccionados.push(item);
    this.medidores=this.medidores.filter(e=>e._id != item._id);
    console.log(this.seleccionados);
  }

  delete(item){
    this.seleccionados = this.seleccionados.filter(e=>e._id != item._id);
    this.medidores.push(item);
  }

  continue(){
    let a ={
      "id":this.id,
      "seleccionados":this.seleccionados
    };   

    this.api.addmedidores(a).subscribe((resp:any)=>{
        if(resp.ok){
          this.router.navigate(['/trabajo/crear']);
          console.log(resp);
        }
    });

  }

}
