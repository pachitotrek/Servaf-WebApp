import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuxService } from 'src/app/services/auxiliar.service';

@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styleUrls: ['./instrumentos.component.scss'],
})
export class InstrumentosComponent implements OnInit {
  formq1: FormGroup;
  id: string;
  datos: any;
  instrumentos: any = [];
  formq4: FormGroup;
  formq3: FormGroup;
  formq2: FormGroup;
  state: boolean = false;
  banco: string = "";
  tipo: string;
  default: any = [];
  seleccion: Array<any> = [];
  valueq4: boolean = false;
  form: FormGroup;
  item: any;
  rango: any;
  metologicas: any;
  nominales: any;
  nominaluno: any;
  nominaldos: any;
  nominaltres: any;
  unique:string="";
  nominalcuatro: any;


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, private aux: AuxService) {
    this.formq1 = new FormGroup({
      orden: new FormControl(null, Validators.required),
      humedad: new FormControl(null, Validators.required),
      presion_entrada: new FormControl(null, Validators.required),
      presion_salida: new FormControl(null, Validators.required),
      rvm: new FormControl(null, Validators.required),
      t_entrada_agua: new FormControl(null, Validators.required),
      temp_ambiente: new FormControl(null, Validators.required),
      tiempo: new FormControl(null, Validators.required),
      caudal: new FormControl(null, Validators.required),
      temprvm: new FormControl(null, Validators.required),

    });
    this.formq2 = new FormGroup({
      orden: new FormControl(null, Validators.required),
      humedad: new FormControl(null, Validators.required),
      presion_entrada: new FormControl(null, Validators.required),
      presion_salida: new FormControl(null, Validators.required),
      rvm: new FormControl(null, Validators.required),
      t_entrada_agua: new FormControl(null, Validators.required),
      temp_ambiente: new FormControl(null, Validators.required),
      tiempo: new FormControl(null, Validators.required),
      caudal: new FormControl(null, Validators.required),
      temprvm: new FormControl(null, Validators.required),
    });
    this.formq3 = new FormGroup({
      orden: new FormControl(null, Validators.required),
      humedad: new FormControl(null, Validators.required),
      presion_entrada: new FormControl(null, Validators.required),
      presion_salida: new FormControl(null, Validators.required),
      rvm: new FormControl(null, Validators.required),
      t_entrada_agua: new FormControl(null, Validators.required),
      temp_ambiente: new FormControl(null, Validators.required),
      tiempo: new FormControl(null, Validators.required),
      caudal: new FormControl(null, Validators.required),
      temprvm: new FormControl(null, Validators.required),
    });
    this.formq4 = new FormGroup({
      orden: new FormControl(null, Validators.required),
      humedad: new FormControl(null, Validators.required),
      presion_entrada: new FormControl(null, Validators.required),
      presion_salida: new FormControl(null, Validators.required),
      rvm: new FormControl(null, Validators.required),
      t_entrada_agua: new FormControl(null, Validators.required),
      temp_ambiente: new FormControl(null, Validators.required),
      tiempo: new FormControl(null, Validators.required),
      caudal: new FormControl(null, Validators.required),
      temprvm: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.getTrabajo(this.id);
    this.getInstrumentos();
    this.getDefault();
  }

  getInstrumentos() {
    this.api.getAllInstrumentos().subscribe((resp: any) => {
      if (resp.ok) {
        this.instrumentos = resp.data;
      }
    });
  }

  getTrabajo(id) {
    this.api.getOrdenTrabajo(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.datos = resp.data[0];     
        this.formq1.patchValue({ orden: this.id });
        this.formq2.patchValue({ orden: this.id });
        this.formq3.patchValue({ orden: this.id });
        this.formq4.patchValue({ orden: this.id });
        this.unique= this.datos.medidores[0];       
        this.getMedidor(this.unique);

        if (this.datos.tipo == 1) {
          this.tipo = "Calibracion";
        } else if (this.datos.tipo == 2) {
          this.tipo = "Perdida de Carga";
        } else {
          this.tipo = "Presion Hidroestatica";
        }
      }
    });
  }
  getDefault() {
    this.api.getDefaultInstrumentos().subscribe((resp: any) => {
      if (resp.ok) {
        this.default = resp.data[0];
        this.formq1.patchValue({ rvm: this.default.rvm });
        this.formq1.patchValue({ t_entrada_agua: this.default.t_entrada_agua });
        this.formq1.patchValue({ tiempo: this.default.tiempo });
        this.formq1.patchValue({ temp_ambiente: this.default.temp_ambiente });
        this.formq1.patchValue({ humedad: this.default.humedad });
        this.formq1.patchValue({ presion_entrada: this.default.presion_entrada });
        this.formq1.patchValue({ presion_salida: this.default.presion_salida });
        this.formq1.patchValue({ caudal: this.default.caudal });
        this.formq1.patchValue({ temprvm: this.default.temprvm });

        this.formq2.patchValue({ rvm: this.default.rvm });
        this.formq2.patchValue({ t_entrada_agua: this.default.t_entrada_agua });
        this.formq2.patchValue({ tiempo: this.default.tiempo });
        this.formq2.patchValue({ temp_ambiente: this.default.temp_ambiente });
        this.formq2.patchValue({ humedad: this.default.humedad });
        this.formq2.patchValue({ presion_entrada: this.default.presion_entrada });
        this.formq2.patchValue({ presion_salida: this.default.presion_salida });
        this.formq2.patchValue({ caudal: this.default.caudal });
        this.formq2.patchValue({ temprvm: this.default.temprvm });

        this.formq3.patchValue({ rvm: this.default.rvm });
        this.formq3.patchValue({ t_entrada_agua: this.default.t_entrada_agua });
        this.formq3.patchValue({ tiempo: this.default.tiempo });
        this.formq3.patchValue({ temp_ambiente: this.default.temp_ambiente });
        this.formq3.patchValue({ humedad: this.default.humedad });
        this.formq3.patchValue({ presion_entrada: this.default.presion_entrada });
        this.formq3.patchValue({ presion_salida: this.default.presion_salida });
        this.formq3.patchValue({ caudal: this.default.caudal });
        this.formq3.patchValue({ temprvm: this.default.temprvm });

        this.formq4.patchValue({ rvm: this.default.rvm });
        this.formq4.patchValue({ t_entrada_agua: this.default.t_entrada_agua });
        this.formq4.patchValue({ tiempo: this.default.tiempo });
        this.formq4.patchValue({ temp_ambiente: this.default.temp_ambiente });
        this.formq4.patchValue({ humedad: this.default.humedad });
        this.formq4.patchValue({ presion_entrada: this.default.presion_entrada });
        this.formq4.patchValue({ presion_salida: this.default.presion_salida });
        this.formq4.patchValue({ caudal: this.default.caudal });
        this.formq4.patchValue({ temprvm: this.default.temprvm });
        this.state = true;
      }
    })
  }


  save() {
    let data = [];
    if(this.valueq4){
      data.push(this.formq1.value);
      data.push(this.formq2.value);
      data.push(this.formq3.value);
      data.push(this.formq4.value);
    }else{
      data.push(this.formq1.value);
      data.push(this.formq2.value);
      data.push(this.formq3.value);      
    }

    data.forEach(e => {
      this.agregar(e.rvm);
      this.agregar(e.t_entrada_agua);
      this.agregar(e.tiempo);
      this.agregar(e.presion_entrada);
      this.agregar(e.temp_ambiente);
      this.agregar(e.humedad);
      this.agregar(e.caudal);
      this.agregar(e.presion_salida);
      this.agregar(e.temprvm);
    });

    let a;

    if(this.valueq4){

      a = {
        instrumentos: this.seleccion,
        medidores: this.datos.medidores,
        id: this.id,
        q1:this.formq1.value,
        q2:this.formq2.value,
        q3:this.formq3.value,
        q4:this.formq4.value
      }

    }else{
       a = {
        instrumentos: this.seleccion,
        medidores: this.datos.medidores,
        id: this.id,
        q1:this.formq1.value,
        q2:this.formq2.value,
        q3:this.formq3.value,
        q4:this.valueq4
      }
    }  

    this.api.addInstrumentosTrabajo(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.aux.createAlert("Exito", "Orden de Trabajo Creada");
        this.router.navigate(['/trabajo/ordenes']);
      }
    });

  }

  agregar(id) {
    let i = this.seleccion.findIndex(e => e == id);
    if (i == -1) {
      this.seleccion.push(id);
    }
  }

  updateq4() {
    if (this.valueq4) {
      this.valueq4 = false;
    } else {
      this.valueq4 = true;
    }
  }

  getMedidor(id) {  
    this.aux.createLoading().then((x:any)=>{
      this.api.getMedidor(id).subscribe((resp: any) => {
        console.log(resp)
        if (resp.ok) {
          this.item = resp.data[0];          

          this.metologicas= this.item.metrologicas;
       
          this.rango = this.metologicas.relacion || "NA";  

          if (this.item.type == "3") {
            this.api.getnominaluno(this.metologicas.clase, this.metologicas.diametro).subscribe((resp: any) => {
              if (resp.ok) {
                this.nominales = resp.data.valores;
                this.nominaluno = this.nominales[0].caudal;
                this.nominaldos = this.nominales[1].caudal;
                this.nominaltres = this.nominales[2].caudal;
                this.nominalcuatro=this.nominales[2].caudal*2;
                console.log(this.nominaluno);
                this.aux.dismissLoading();
              }
            },(error:any)=>{
              let q1 = this.metologicas.q3 / this.metologicas.q3q1;
              let q2 = 1.6 * q1;
              let q4 = 1.25 * this.metologicas.q3;
        
              this.nominaluno = q1;
              this.nominaldos = q2;
              this.nominaltres = this.metologicas.q3;
              this.nominalcuatro=q4;
              this.aux.dismissLoading();       

            });
          } else {
            this.api.getnominaldos(this.metologicas.relacion, this.metologicas.diametro).subscribe((resp: any) => {
              if (resp.ok) {
                this.nominales = resp.data.valores;
                this.nominaluno = this.nominales[0].caudal;
                this.nominaldos = this.nominales[1].caudal;
                this.nominaltres = this.nominales[2].caudal;
                this.nominalcuatro=this.nominales[2].caudal*1.25;           
                this.aux.dismissLoading();
              }
            },(error:any)=>{
              this.nominaluno = this.metologicas.q1;
              this.nominaldos = this.metologicas.q2;
              this.nominaltres = this.metologicas.q3;
              this.nominalcuatro=this.metologicas.q4;            
              this.aux.dismissLoading();              
            });
          } 
         
        }
      })
    }).catch((error:any)=>{

  
    })
 
  }


}
