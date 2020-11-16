import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuxService } from 'src/app/services/auxiliar.service';

@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styleUrls: ['./instrumentos.component.scss'],
})
export class InstrumentosComponent implements OnInit {
  instrumentos:any=[];
  default:any=[];
  form:FormGroup;
  state:boolean=false;

  constructor(private api:ApiService,
    private aux:AuxService) { 
      this.form= new FormGroup({
        _id:new FormControl(null),
        rvm:new FormControl(null),
        t_entrada_agua:new FormControl(null),
        tiempo:new FormControl(null),
        temp_ambiente:new FormControl(null),
        humedad:new FormControl(null),
        presion_entrada:new FormControl(null),
        presion_salida:new FormControl(null),      
        caudal:new FormControl(null),    
        temprvm:new FormControl(null),    
      })
    }

  ngOnInit() {
    this.getAll();
    this.getDefault();
  }

  getAll(){
    this.api.getAllInstrumentos().subscribe((resp:any)=>{
      if(resp.ok){
        this.instrumentos=resp.data;       
      }
    });
  }

  getDefault(){
    this.api.getDefaultInstrumentos().subscribe((resp:any)=>{
      if(resp.ok){
        this.default=resp.data[0];      
        this.form.patchValue({_id:this.default._id});
        this.form.patchValue({rvm:this.default.rvm});
        this.form.patchValue({t_entrada_agua:this.default.t_entrada_agua});
        this.form.patchValue({tiempo:this.default.tiempo});
        this.form.patchValue({temp_ambiente:this.default.temp_ambiente});
        this.form.patchValue({humedad:this.default.humedad});
        this.form.patchValue({presion_entrada:this.default.presion_entrada});
        this.form.patchValue({presion_salida:this.default.presion_salida});  
        this.state=true;       
      }
    })
  }

  update(){  
    this.aux.createLoading().then((x:any)=>{     
      this.api.updateDefaultInstrumento(this.form.value).subscribe((resp:any)=>{      
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","Ha sido editado sus parametros definidos");
            this.getAll();
            this.getDefault();
          })
        }
      });

    }).catch((e:any)=>{
      this.aux.dismissLoading().then((b:any)=>{
        this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
      })

    })
  }






}
