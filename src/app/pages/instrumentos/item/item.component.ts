import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  form:FormGroup;
  item: any=[];
  opciones: Array<any> = [];
  select: any = [];
  escalauno: boolean = false;
  escalados: boolean = false;
  id: any;
  
  constructor(private api:ApiService,private aux:AuxService,private route:ActivatedRoute,private router:Router) { 
    this.form= new FormGroup({
      _id:new FormControl(null,Validators.required),
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
      descripcion_dos:new FormControl(null),
      status:new FormControl(null,Validators.required), 
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.OpcionesInstrumentos();
    this.getOne(this.id);
  }

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.OpcionesInstrumentos();
    this.getOne(this.id);
  }


  getOne(id){
    this.api.getInstrumento(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.item=resp.data[0];       
        this.form.setValue(this.item);
        this.changeType2(this.item.instrumento);
      }
    })
  }
  OpcionesInstrumentos() {
    this.api.OpcionesInstrumentos().subscribe((resp: any) => {
      if (resp.ok) {       
        this.opciones = resp.data;
      }
    })
  }
  changeType(event) {
    let id = event;
    this.select = this.opciones.find(e => e.tipo == id);    
  }
  changeType2(tipo) {  
    this.select = this.opciones.find(e => e.tipo == tipo);
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
      this.api.updateInstrumento(this.form.value).subscribe((resp:any)=>{     
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Instrumento ha sido editado");           
            this.form.reset();
            this.router.navigate(['/instrumentos/consultar']);
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
