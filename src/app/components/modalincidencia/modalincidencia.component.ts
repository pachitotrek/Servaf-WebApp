import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-modalincidencia',
  templateUrl: './modalincidencia.component.html',
  styleUrls: ['./modalincidencia.component.scss'],
})
export class ModalincidenciaComponent implements OnInit {
  form:FormGroup;

  constructor(private api:ApiService,private aux:AuxService,private modal:ModalController,private eventos:EventosService) { 
    this.form= new FormGroup({
      titulo:new FormControl(null,Validators.required)
    })
  }

  ngOnInit() {}

  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.crearIncidencias(this.form.value).subscribe((resp:any)=>{      
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{           
            this.aux.createAlert("Exito","Nueva Incidencia Agregada");
            this.eventos.newIncidenciaAlert();
            this.modal.dismiss();            
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
