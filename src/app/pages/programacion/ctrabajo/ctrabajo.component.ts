import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ctrabajo',
  templateUrl: './ctrabajo.component.html',
  styleUrls: ['./ctrabajo.component.scss'],
})
export class CtrabajoComponent implements OnInit {
  id: string;
  orden: any=[];
  medidores:any=[];
  instrumentos:any=[];
  status:boolean=true;

  q1_caudal:any=[];
  q1_humedad:any=[];
  q1_presion_entrada:any=[];
  q1_presion_salida:any=[];
  q1_rvm:any=[];
  q1_t_entrada_agua:any=[];
  q1_temp_ambiente:any=[];
  q1_tiempo:any=[];
  q1_temprvm:any=[];

  q2_caudal:any=[];
  q2_humedad:any=[];
  q2_presion_entrada:any=[];
  q2_presion_salida:any=[];
  q2_rvm:any=[];
  q2_t_entrada_agua:any=[];
  q2_temp_ambiente:any=[];
  q2_tiempo:any=[];
  q2_temprvm:any=[];

  q3_caudal:any=[];
  q3_humedad:any=[];
  q3_presion_entrada:any=[];
  q3_presion_salida:any=[];
  q3_rvm:any=[];
  q3_t_entrada_agua:any=[];
  q3_temp_ambiente:any=[];
  q3_tiempo:any=[];
  q3_temprvm:any=[];



  constructor(private route:ActivatedRoute,private api:ApiService,private titleService: Title) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getOrden(this.id);
    this.getMedidores(this.id);
  }

  getOrden(id){
    this.api.certificadoOrdenTrabajo(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.orden=resp.data[0];

        this.q1_caudal=this.orden.instrumentos_q1.caudal;
        this.q1_humedad=this.orden.instrumentos_q1.humedad;
        this.q1_presion_entrada= this.orden.instrumentos_q1.presion_entrada;
        this.q1_presion_salida=this.orden.instrumentos_q1.presion_salida;
        this.q1_rvm=this.orden.instrumentos_q1.rvm;
        this.q1_t_entrada_agua=this.orden.instrumentos_q1.t_entrada_agua;
        this.q1_temp_ambiente=this.orden.instrumentos_q1.temp_ambiente;
        this.q1_temprvm=this.orden.instrumentos_q1.temprvm; 

        this.q2_caudal=this.orden.instrumentos_q2.caudal;
        this.q2_humedad=this.orden.instrumentos_q2.humedad;
        this.q2_presion_entrada= this.orden.instrumentos_q2.presion_entrada;
        this.q2_presion_salida=this.orden.instrumentos_q2.presion_salida;
        this.q2_rvm=this.orden.instrumentos_q2.rvm;
        this.q2_t_entrada_agua=this.orden.instrumentos_q2.t_entrada_agua;
        this.q2_temp_ambiente=this.orden.instrumentos_q2.temp_ambiente;
        this.q2_temprvm=this.orden.instrumentos_q2.temprvm; 

        this.q3_caudal=this.orden.instrumentos_q3.caudal;
        this.q3_humedad=this.orden.instrumentos_q3.humedad;
        this.q3_presion_entrada= this.orden.instrumentos_q3.presion_entrada;
        this.q3_presion_salida=this.orden.instrumentos_q3.presion_salida;
        this.q3_rvm=this.orden.instrumentos_q3.rvm;
        this.q3_t_entrada_agua=this.orden.instrumentos_q3.t_entrada_agua;
        this.q3_temp_ambiente=this.orden.instrumentos_q3.temp_ambiente;
        this.q3_temprvm=this.orden.instrumentos_q3.temprvm; 
        
        
        this.instrumentos=this.orden.instrumentos;
        this.status=true; 
      }
    })

  }

  getMedidores(id){
    this.api.certificadoOrdenTrabajoMedidores(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.medidores=resp.data;     
      }
    })
  }

  changeTitle(id){
    this.titleService.setTitle(id);
  }

  print(){   
    let titulo=`OT-LMC-${this.orden.orden}`;
    this.changeTitle(titulo);
    window.print();
    this.changeTitle('ServafAPP');  
  }
   

}
