import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-ensayos',
  templateUrl: './ensayos.page.html',
  styleUrls: ['./ensayos.page.scss'],
})
export class EnsayosPage implements OnInit {
  form:FormGroup;

  constructor(private api: ApiService,private aux:AuxService,private eventos:EventosService) {
    this.form = new FormGroup({
      numero:new FormControl(null,Validators.required),
      identificacion:new FormControl(null,Validators.required),
      tipo:new FormControl(null,Validators.required),
      automatico:new FormControl(null),
      lineas:new FormControl(null,Validators.required),
      medidores:new FormControl(null,Validators.required),
      descripcion:new FormControl(null,Validators.required)
    });

  
   }

  ngOnInit() {
  }

  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.crearBanco(this.form.value).subscribe((resp:any)=>{    
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Banco de Ensayos ha sido creado");           
            this.form.reset();
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
