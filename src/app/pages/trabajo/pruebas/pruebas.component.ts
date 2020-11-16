import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss'],
})
export class PruebasComponent implements OnInit {
  medidores: any;
  id: string;
  orden: any = [];
  form: FormGroup;
  registros: any = [];
  datos: any = [];
  close: boolean = false;
  form1: FormGroup;
  form2: FormGroup;
  repeticion: number = null;
  corridaactual: any;
  pruebas: Array<any> = [
  ];
  default: Array<any> = [
    { tipo: "Q1" },
    { tipo: "Q2" },
    { tipo: "Q3" }
  ];

  parametros: any;
  tipo: string;
  ready:boolean=false;





  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, public alertController: AlertController) {
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
      volumenrvm: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required)
    });
    this.form1 = new FormGroup({
      tipo: new FormControl(null, Validators.required)
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
    this.getpruebas(this.id);

    // this.getMedidores(this.id);
    this.getdefaults();
    // this.getstate();
  }

  nav() {
    let a = this.form1.value;
    this.router.navigate([`/trabajo/corrida/${this.id}`], { queryParams: { tipo: a.tipo, numero: 1 } });
  }

  // set(){
  //   this.pruebas= this.pruebas.filter(e=>e != this.tipo);
  //   console.log(this.pruebas);
  // }

  getpruebas(id) {
    this.api.getpruebas(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.pruebas = resp.data;
        if (this.pruebas.length == 0) {
          this.router.navigate([`/trabajo/generar/${this.id}`]);                 
        } else if (this.pruebas.length == this.parametros.repeticiones) {
          this.ready = true;
        } else {

        }
      }
    });
  }

  async cerrar() {
    const alert = await this.alertController.create({
      header: 'Cerrar Prueba!',
      message: 'Desea Cerrar la prueba <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.save();
          }
        }
      ]
    });

    await alert.present();
  }

  save() {
    let a={
      _id:this.id
    };

    this.api.closeordentrabajo(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.router.navigate([`/trabajo/calibrar`]);
      }
    });

  }
  
  generate(){
    let a={
      _id:this.id
    }
    this.api.generarinforme(a).subscribe((resp:any)=>{
      console.log(resp);
    });
  }


  // set(){
  //   this.repeticion=this.repeticion+1;
  //   if(this.repeticion > this.parametros.repeticiones){
  //       this.form.reset();
  //       this.form1.reset();
  //       this.form2.reset();
  //       this.rep=false;
  //       this.in=false;
  //       this.me=false;
  //       this.du=false;
  //   }else{
  //     this.form.patchValue({repeticion:this.repeticion});
  //     this.form.patchValue({tipo:a.tipo});
  //     this.form.patchValue({orden:this.id});   
  //     this.rep=true;
  //     this.in=true;
  //     this.me=true;
  //   }
  // }



  // savetime(){
  //   this.api.savetime(this.form2.value).subscribe((resp:any)=>{
  //       if(resp.ok){                    
  //         this.form.reset();
  //         this.set();
  //       }
  //   });
  // }

  // getstate(){
  //   this.api.getstatecorrida(this.id).subscribe((resp:any)=>{
  //     if(resp.ok){
  //       this.corridaactual=resp.data;

  //       this.q1 =this.corridaactual.find(e=>e.tipo=="Q1");    
  //       this.q2 =this.corridaactual.find(e=>e.tipo=="Q2");    
  //       this.q3 =this.corridaactual.find(e=>e.tipo=="Q3"); 
  //       this.q4 =this.corridaactual.find(e=>e.tipo=="Q4");     


  //     }
  //   })
  // }

  getdefaults() {
    this.api.getDefaultParametros().subscribe((resp: any) => {
      if (resp.ok) {
        this.parametros = resp.data[0];
        console.log(this.parametros);
      }
    });
  }









}
