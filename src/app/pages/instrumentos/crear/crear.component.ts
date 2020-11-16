import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuxService } from 'src/app/services/auxiliar.service';


class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  form:FormGroup;
  opciones: Array<any> = [];
  select: any = [];
  escalauno: boolean = false;
  escalados: boolean = false;


  constructor(private api: ApiService,private aux:AuxService) {
    this.form= new FormGroup({
      patron:new FormControl(null,Validators.required),
      codigo:new FormControl(null,Validators.required),
      serial:new FormControl(null,Validators.required),
      certificado:new FormControl(null,Validators.required),
      fuente:new FormControl(null,Validators.required),
      fecha_calibracion:new FormControl(null,Validators.required),
      instrumento:new FormControl(null,Validators.required),
      escalas:new FormControl(null,Validators.required),
      propiedad_uno:new FormControl(null,Validators.required),
      tipo_uno:new FormControl(null,Validators.required),
      unidad_uno:new FormControl(null,Validators.required),
      limite_inferior_uno:new FormControl(null,Validators.required),
      limite_superior_uno:new FormControl(null,Validators.required),
      division_escala_uno:new FormControl(null,Validators.required),
      descripcion_uno:new FormControl(null,Validators.required),
      propiedad_dos:new FormControl(null),
      tipo_dos:new FormControl(null),
      unidad_dos:new FormControl(null),
      limite_inferior_dos:new FormControl(null),
      limite_superior_dos:new FormControl(null),
      division_escala_dos:new FormControl(null),
      descripcion_dos:new FormControl(null) 
    })

 
  }

  ngOnInit() {
    this.OpcionesInstrumentos();
  }


  OpcionesInstrumentos() {
    this.api.OpcionesInstrumentos().subscribe((resp: any) => {
      if (resp.ok) {
        console.log(resp);
        this.opciones = resp.data;
      }
    })
  }
  changeType(event) {
    let id = event;
    this.select = this.opciones.find(e => e.tipo == id);
    console.log(this.select);
  }
  escalas(event) {
    if(event==1){
      this.escalauno=true;
      this.escalados=false;
      this.form.patchValue({propiedad_uno:this.select.uno.propiedad});

    }else if(event==2){
      this.escalados=true;
      this.form.patchValue({propiedad_uno:this.select.uno.propiedad});
      this.form.patchValue({propiedad_dos:this.select.dos.propiedad});
    }else{
      this.escalados=false;
      this.escalauno=false;
    }
  }

  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.api.crearInstrumento(this.form.value).subscribe((resp:any)=>{
        console.log(resp);
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Instrumento ha sido creado");           
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
