import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-q2',
  templateUrl: './q2.component.html',
  styleUrls: ['./q2.component.scss'],
})
export class Q2Component implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  id: string;
  tipo: string;
  repeticion: any;
  datos: any;
  medidores:any=[];
  ready:boolean=false;
  data:any=[];
  parametros: any;
  numeros:number=null;

  constructor(private route:ActivatedRoute,private router:Router,private api:ApiService,private lc:LocalStorageService) { 
    this.form = new FormGroup({
      tipo: new FormControl(null, Validators.required),
      orden: new FormControl(null, Validators.required),
      repeticion: new FormControl(null, Validators.required),     
      caudal: new FormControl(null, Validators.required),
      pentrada: new FormControl(null, Validators.required),
      psalida: new FormControl(null, Validators.required),
      tempagua: new FormControl(null, Validators.required),
      temprvm: new FormControl(null, Validators.required),
      volumenrvm: new FormControl(null, Validators.required),
      horas: new FormControl(null, Validators.required),
      minutos: new FormControl(null, Validators.required),
      segundos: new FormControl(null, Validators.required)
    });   
  }

  ngOnInit() {
    this.ready=false;
    this.form.reset();
    this.id = this.route.snapshot.paramMap.get("id");
    this.tipo = this.route.snapshot.queryParamMap.get("tipo");
    this.repeticion = this.route.snapshot.queryParamMap.get("numero");
    this.getTrabajo(this.id);
    this.getdefaults();
  }

  ionViewWillEnter() {
    this.ready=false;
    this.form.reset();
    this.id = this.route.snapshot.paramMap.get("id");
    this.tipo = this.route.snapshot.queryParamMap.get("tipo");
    this.repeticion = this.route.snapshot.queryParamMap.get("numero");
    this.getTrabajo(this.id);
    this.getdefaults();
  }

  
  getTrabajo(id){
    this.api.getOrdenTrabajo(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.datos=resp.data[0]; 
        this.medidores=this.datos.medidores;       
        this.form.patchValue({repeticion:this.repeticion});
        this.form.patchValue({orden:this.id});
        this.form.patchValue({tipo:this.tipo});                  
      }
    });
  }

  save(){
    this.data=this.form.value;
    this.ready=true;
  }

  getdefaults() {
    this.api.getDefaultParametros().subscribe((resp: any) => {
      if (resp.ok) {
        this.parametros = resp.data[0];
        console.log(this.parametros);      
        this.numeros=this.parametros.repeticiones;
      }
    });
  }

  next(){
    let numero =parseInt(this.repeticion)+1;
    this.ready=false; 
    if(parseInt(this.repeticion) > this.numeros){  
      this.router.navigate([`/trabajo/finales/${this.id}`],{ queryParams: { tipo: this.tipo, numero: numero } });
    }else{      
      this.router.navigate([`/trabajo/q1/${this.id}`], { queryParams: { tipo: this.tipo, numero: numero } });
    }
  }

}
