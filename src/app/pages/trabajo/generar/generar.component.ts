import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.scss'],
})
export class GenerarComponent implements OnInit {
  id: string;
  ready:boolean=false;
  inf:boolean=true;
  resultados:any=[];
  orden:any=[];
  entrada: any=[];
  medidores: any=[];
  instrumentos: Array<any>=[];
  caudal:Array<any>=[];
  temprvm:Array<any>=[];
  tempagua:Array<any>=[];
  volumenrvm:Array<any>=[];
  tiempo:Array<any>=[];
  presionentrada:Array<any>=[];
  tempambiente:Array<any>=[];
  humedad:Array<any>=[];
  presionsalida:Array<any>=[];
  off: string;

  constructor(private api:ApiService,
    private alertController:AlertController ,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id"); 
    this.off= this.route.snapshot.queryParamMap.get("ok");
    if(this.off){
      this.getResultados(this.id);
    }   
  }



  async cerrar() {
    const alert = await this.alertController.create({
      header: 'Cerrar Orden!',
      message: 'Desea Cerrar la orden ??',
      mode:"ios",
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
        this.generate();
      }
    });

  }
  
  generate(){
    let a={
      orden:this.id
    }
    this.api.generarinforme(a).subscribe((resp:any)=>{
      if(resp.ok){
        // this.router.navigate(['/trabajo/calibrar']);
        this.getResultados(this.id);
      }
    });
  }

  getResultados(id){
    this.api.getresultados(id).subscribe((resp:any)=>{
        if(resp.ok){
          this.resultados=resp.data[0];
          this.getOrden(id);
        }
    });
  }

  getOrden(id){
    // this.api.GetOpenOrden(id).subscribe((resp:any)=>{
    //   if(resp.ok){
    //     this.orden=resp.data[0];
    //     console.log(resp)
    //     this.getOrdenEntrada(this.orden.entrada._id)
    //     this.getmedidores(this.id); 
    //     this.getInstrumentos(this.id);      
    //   }
    // })
  }

  getOrdenEntrada(id){
    this.api.getOrden(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.entrada=resp.data[0];       
      }
    })
  }
  getmedidores(id){
    this.api.GetOMedidoresTrabajo(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.medidores=resp.data;

        this.ready=true;
        this.inf=false;
      }
    })
  }

  getInstrumentos(id){
    this.api.getAllInstrumentosOrden(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.instrumentos=resp.data;
        this.instrumentos.forEach(e=>{
          this.caudal.push( e.caudal);
          this.temprvm.push(e.temprvm);
          this.tempagua.push(e.tempagua);
          this.volumenrvm.push(e.volumenrvm);
          this.tiempo.push(e.tiempo);
          this.presionentrada.push(e.presionentrada);
          this.tempambiente.push(e.tempambiente);
          this.humedad.push(e.humedad);
          this.presionsalida.push(e.presionsalida);      
        });        
        
        this.ready=true;
        this.inf=false; 

      }
    })
  }

  print(){
    window.print();
  }








}
