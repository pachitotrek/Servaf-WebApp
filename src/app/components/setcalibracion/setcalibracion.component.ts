import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-setcalibracion',
  templateUrl: './setcalibracion.component.html',
  styleUrls: ['./setcalibracion.component.scss'],
})
export class SetcalibracionComponent implements OnInit {
  @Input() item:any=[];
  form:FormGroup;
  a:any={
    uno:"",
    dos:"",
    tres:"",
    cuatro:"",
    cinco:"",
    seis:""
  }

  constructor(private aux:AuxService,private api:ApiService,private router:Router,private modalcontroller:ModalController,private eventos:EventosService) {
    this.form= new FormGroup({
      _id:new FormControl(null,Validators.required),
      proxima:new FormControl(null,Validators.required),
      patron:new FormControl(null,Validators.required),
      serial:new FormControl(null,Validators.required),
      codigo:new FormControl(null,Validators.required),
      certificado:new FormControl(null,Validators.required),
      fecha_calibracion:new FormControl(null,Validators.required),
      trazabilidad:new FormControl(null,Validators.required),
      error_indicacion:new FormControl(null,Validators.required),
      error_indicacion_anterior:new FormControl(null,Validators.required),
      incertidumbre:new FormControl(null,Validators.required),
      division_escala:new FormControl(null,Validators.required),
      correcion_escala:new FormControl(null,Validators.required),
      incertidumbre_escala:new FormControl(null,Validators.required),
      factor_cubrimiento:new FormControl(null,Validators.required),
      parametro_referencia:new FormControl(null,Validators.required),
      item:new FormControl(null)
    });
   }

  ngOnInit() {
    console.log(this.item);
    this.set();
  }

  save(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.setcalibraciones(this.form.value).subscribe((resp:any)=>{      
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{           
            this.aux.createAlert("Exito","Calibracion Registrada");
            this.eventos.newCalibracionAlert();
            this.modalcontroller.dismiss();
          })
        }
      });

    }).catch((e:any)=>{
      this.aux.dismissLoading().then((b:any)=>{
        this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
      })

    })

  }


  set(){
    this.form.patchValue({_id:this.item._id});
    this.form.patchValue({patron:this.item.patron});
    this.form.patchValue({serial:this.item.serial});
    this.form.patchValue({codigo:this.item.codigo});
    this.form.patchValue({item:this.item});

    if(this.item.propiedad_uno=="Caudal" || this.item.propiedad_uno=="Caudal" ){
      this.a.uno="L/h";
      this.a.dos="L/h";
      this.a.tres="L/h";
      this.a.cuatro="L/h";
      this.a.cinco="L/h";
      this.a.seis="L/h";      
    }else if(this.item.propiedad_uno=="Humedad" || this.item.propiedad_dos=="Humedad"){
      this.a.uno="%";
      this.a.dos="%";
      this.a.tres="%";
      this.a.cuatro="%";
      this.a.cinco="%";
      this.a.seis="%";  
    }else if(this.item.propiedad_uno=="Temperatura" || this.item.propiedad_dos=="Temperatura"){
      this.a.uno="C";
      this.a.dos="C";
      this.a.tres="C";
      this.a.cuatro="C";
      this.a.cinco="C";
      this.a.seis="C";  
    }else if(this.item.propiedad_uno=="Volumen" || this.item.propiedad_dos=="Volumen"){
      this.a.uno="L";
      this.a.dos="L";
      this.a.tres="L";
      this.a.cuatro="L";
      this.a.cinco="L";
      this.a.seis="L";  
    }else if(this.item.propiedad_uno=="Tiempo" || this.item.propiedad_dos=="Tiempo"){
      this.a.uno="S";
      this.a.dos="S";
      this.a.tres="S";
      this.a.cuatro="S";
      this.a.cinco="S";
      this.a.seis="S";  
    }else if(this.item.propiedad_uno=="Presion" || this.item.propiedad_dos=="Presion"){
      this.a.uno="bar";
      this.a.dos="bar";
      this.a.tres="bar";
      this.a.cuatro="bar";
      this.a.cinco="bar";
      this.a.seis="bar";  
    }
  }



}
