import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-q2',
  templateUrl: './q2.component.html',
  styleUrls: ['./q2.component.scss'],
})
export class Q2Component implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  id: string;
  medidores: any;
  datos: any;
  orden: any;
  parametros: any;
  repeticion: any;
  tipo: any;
  uno: boolean = true;
  dos: boolean = false;
  tres: boolean = false;
  rp: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      tipo: new FormControl(null, Validators.required),
      orden: new FormControl(null, Validators.required),
      repeticion: new FormControl(null, Validators.required),
      temp: new FormControl(null, Validators.required),
      humedad: new FormControl(null, Validators.required),
      caudal: new FormControl(null, Validators.required),
      pentrada: new FormControl(null, Validators.required),
      psalida: new FormControl(null, Validators.required),
      tempagua: new FormControl(null, Validators.required),
      temprvm: new FormControl(null, Validators.required),
      volumenrvm: new FormControl(null, Validators.required)
    });

    this.form2 = new FormGroup({
      _id: new FormControl(null, Validators.required),
      horas: new FormControl(null, Validators.required),
      minutos: new FormControl(null, Validators.required),
      segundos: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get("id");
    this.tipo = this.route.snapshot.queryParamMap.get("tipo");
    this.repeticion = this.route.snapshot.queryParamMap.get("numero");
    this.repeticion=parseInt(this.repeticion); 
    this.getMedidores(this.id);
    this.getdefaults();
    this.set();
  }

  ionViewWillEnter() {   
    this.id = this.route.snapshot.paramMap.get("id");
    this.tipo = this.route.snapshot.queryParamMap.get("tipo");
    this.repeticion = this.route.snapshot.queryParamMap.get("numero");
    this.repeticion=parseInt(this.repeticion); 
    this.getMedidores(this.id);
    this.getdefaults();
    this.set();
  }

  getMedidores(id) {
    this.api.GetOMedidoresTrabajo(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.medidores = resp.data;
      }
    });
  }

  save() {

    this.datos = this.form.value;
    this.api.iniciales(this.form.value).subscribe((resp: any) => {
      if (resp.ok) {
        this.orden = resp.data;
        this.form2.patchValue({ _id: this.orden._id });
        this.dos = true;
        this.tres = true
      }
    });
  }

  getdefaults() {
    this.api.getDefaultParametros().subscribe((resp: any) => {
      if (resp.ok) {
        this.parametros = resp.data[0];
      }
    });
  }

  savetime() {
    this.api.savetime(this.form2.value).subscribe((resp: any) => {
      if (resp.ok) {  
       
        if (this.repeticion > this.parametros.repeticiones) {
          this.form.reset();
          this.form2.reset();
          let a = {
            orden: this.id,
            tipo: this.tipo
          }
          this.api.updatepruebas(a).subscribe((resp: any) => {
            if (resp.ok) {
              this.router.navigate([`/trabajo/generar/${this.id}`]);
            }
          });
        } else {     

          this.router.navigate([`/trabajo/corrida/${this.id}`], { queryParams: { tipo: this.tipo, numero: this.repeticion } });
        
         
        }
      }
    });
  }

  set() {
    this.form.patchValue({ tipo: this.tipo });
    this.form.patchValue({ repeticion: this.repeticion });
    this.form.patchValue({ orden: this.id });    
    this.repeticion++;   
    this.rp=this.repeticion-1;

  }












}
