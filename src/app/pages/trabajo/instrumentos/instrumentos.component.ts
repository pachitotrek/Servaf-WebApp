import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styleUrls: ['./instrumentos.component.scss'],
})
export class InstrumentosComponent implements OnInit {
  formq1: FormGroup;
  id: string;
  datos: any;
  instrumentos:any=[];
  formq4: FormGroup;
  formq3: FormGroup;
  formq2: FormGroup;
  state:boolean=false;
  banco:string="";
  tipo: string;

  constructor(private api:ApiService,private route:ActivatedRoute,private router:Router) { 
    this.formq1= new FormGroup({
      orden:new FormControl(null,Validators.required),
      caudal:new FormControl(null,Validators.required),
      temprvm:new FormControl(null,Validators.required),
      tempagua:new FormControl(null,Validators.required),
      volumenrvm:new FormControl(null,Validators.required),
      tiempo:new FormControl(null,Validators.required),
      presionentrada:new FormControl(null,Validators.required),
      tempambiente:new FormControl(null,Validators.required),
      humedad:new FormControl(null,Validators.required),
      presionsalida:new FormControl(null,Validators.required) 
    });
    this.formq2= new FormGroup({
      orden:new FormControl(null,Validators.required),
      caudal:new FormControl(null,Validators.required),
      temprvm:new FormControl(null,Validators.required),
      tempagua:new FormControl(null,Validators.required),
      volumenrvm:new FormControl(null,Validators.required),
      tiempo:new FormControl(null,Validators.required),
      presionentrada:new FormControl(null,Validators.required),
      tempambiente:new FormControl(null,Validators.required),
      humedad:new FormControl(null,Validators.required),
      presionsalida:new FormControl(null,Validators.required) 
    });
    this.formq3= new FormGroup({
      orden:new FormControl(null,Validators.required),
      caudal:new FormControl(null,Validators.required),
      temprvm:new FormControl(null,Validators.required),
      tempagua:new FormControl(null,Validators.required),
      volumenrvm:new FormControl(null,Validators.required),
      tiempo:new FormControl(null,Validators.required),
      presionentrada:new FormControl(null,Validators.required),
      tempambiente:new FormControl(null,Validators.required),
      humedad:new FormControl(null,Validators.required),
      presionsalida:new FormControl(null,Validators.required) 
    });
    this.formq4= new FormGroup({
      orden:new FormControl(null,Validators.required),
      caudal:new FormControl(null,Validators.required),
      temprvm:new FormControl(null,Validators.required),
      tempagua:new FormControl(null,Validators.required),
      volumenrvm:new FormControl(null,Validators.required),
      tiempo:new FormControl(null,Validators.required),
      presionentrada:new FormControl(null,Validators.required),
      tempambiente:new FormControl(null,Validators.required),
      humedad:new FormControl(null,Validators.required),
      presionsalida:new FormControl(null,Validators.required) 
    });
 
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id"); 
    this.getTrabajo(this.id);
    this.getInstrumentos();
  }

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get("id"); 
    this.getTrabajo(this.id);
    this.getInstrumentos();
  }

  getTrabajo(id){
    // this.api.GetOpenOrden(id).subscribe((resp:any)=>{
    //   if(resp.ok){
    //     this.datos=resp.data[0];
    //     let q=this.datos.entrada;    
    //     this.formq1.patchValue({orden:this.id});
    //     this.formq2.patchValue({orden:this.id});
    //     this.formq3.patchValue({orden:this.id});
    //     this.formq4.patchValue({orden:this.id});
    //     this.formq1.patchValue({caudal:q.q1});
    //     this.formq2.patchValue({caudal:q.q2});
    //     this.formq3.patchValue({caudal:q.q3});
    //     this.formq4.patchValue({caudal:q.q4});
    //     if(this.datos.tipo==1){
    //       this.tipo="Calibracion";
    //     }else if(this.datos.tipo==2){
    //       this.tipo="Perdida de Carga";
    //     }else{
    //       this.tipo="Presion Hidroestatica";
    //     }
    //     this.state=true;       
    //   }
    // });
  }

  getInstrumentos(){
    this.api.getAllInstrumentos().subscribe((resp:any)=>{
      if(resp.ok){
        this.instrumentos=resp.data;      
      }
    });
  }

  save(){
    let a={
      q1:this.formq1.value,
      q2:this.formq2.value,
      q3:this.formq3.value,
      q4:this.formq4.value,
    }

    this.api.saveInstrumentosOrdenTrabajo(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.router.navigate([`/trabajo/medidores/${this.id}`]);
      }
    });
  }


}
