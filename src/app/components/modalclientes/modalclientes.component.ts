import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-modalclientes',
  templateUrl: './modalclientes.component.html',
  styleUrls: ['./modalclientes.component.scss'],
})
export class ModalclientesComponent implements OnInit {
  form: FormGroup;

  constructor(private api:ApiService,private aux:AuxService,
    private eventos:EventosService) { 
    this.form= new FormGroup({
      nombre:new FormControl(null,Validators.required),
      numero:new FormControl(null,Validators.required),
      direccion:new FormControl(null,Validators.required),
      identificacion:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      telefono:new FormControl(null,Validators.required),
      ciudad:new FormControl(null,Validators.required),
      _id:new FormControl(null),
      creado:new FormControl(null)  
    });
  }

  ngOnInit() {}

  
  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.crearClientes(this.form.value).subscribe((resp:any)=>{        
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El cliente ha sido creado");           
            this.eventos.newClientAlert();
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
