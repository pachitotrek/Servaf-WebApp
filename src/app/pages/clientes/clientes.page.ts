import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  edit:boolean=false;
  pannel:boolean=true;
  clientes:any=[];

  constructor(private api:ApiService,private aux:AuxService) {
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
    this.form2= new FormGroup({
        pass:new FormControl(null,Validators.required),
        pass2:new FormControl(null,Validators.required),
        _id:new FormControl(null,Validators.required) 
    });
   }

  ngOnInit() {
    this.getClientes();
  }

  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.crearClientes(this.form.value).subscribe((resp:any)=>{
        console.log(resp);
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El cliente ha sido creado");
            this.getClientes();
          })
        }
      });

    }).catch((e:any)=>{
      this.aux.dismissLoading().then((b:any)=>{
        this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
      })

    })
  }

  getClientes(){
    this.api.GetClientes().subscribe((resp:any)=>{
      if(resp.ok){
        this.clientes=resp.clientes;
      }
    })
  }

  set(item){
    this.form.setValue(item);
    this.edit=true;
  }

  refresh(){
    this.form.reset();
    this.edit=false;
  }

  update(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.editClientes(this.form.value).subscribe((resp:any)=>{
        console.log(resp);
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El cliente ha sido actualizado");
            this.edit=false;
            this.getClientes();
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
