import { Component, OnInit, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuxService } from 'src/app/services/auxiliar.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.scss'],
})
export class GenerarComponent implements OnInit {
  [x: string]: any;
  id: string;
  ready: boolean = false;
  inf: boolean = false;
  resultados: any = [];
  orden: any = [];
  entrada: any = [];
  medidores: any = [];
  instrumentos: Array<any> = [];
  caudal: Array<any> = [];
  temprvm: Array<any> = [];
  tempagua: Array<any> = [];
  volumenrvm: Array<any> = [];
  tiempo: Array<any> = [];
  presionentrada: Array<any> = [];
  tempambiente: Array<any> = [];
  humedad: Array<any> = [];
  presionsalida: Array<any> = [];
  off: string;
  item: any = [];
  q1: any = [];
  q2: any = [];
  q3: any = [];
  q4: any = [];
  ambientales: any = [];
  datos: any = [];
  cliente: any;
  metologicas: any;
  datosg: any;
  trabajo: any;
  rango: any;
  nominales: any = [];
  nominaluno: any;
  nominaldos: any;
  nominaltres: any;
  @ViewChild('print', { static: false }) content: ElementRef;

  img: any;

  constructor(private api: ApiService,private titleService: Title,
    private alertController: AlertController, private route: ActivatedRoute, private router: Router, private aux: AuxService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getMedidor(this.id);
    
  }


  changeTitle(id){
    this.titleService.setTitle(id);
  }

  getMedidor(id) {
    this.aux.createLoading().then((x:any)=>{
      this.api.getMedidor(id).subscribe((resp: any) => {
        if (resp.ok) {
          this.item = resp.data[0];
          this.cliente = this.item.cliente;
          this.metologicas = this.item.metrologicas;
          this.instrumentos = this.item.instrumentos;
          this.entrada = this.item.orden_entrada;
          this.trabajo = this.item.orden_trabajo;
          this.q1 = this.item.q1;
          this.q2 = this.item.q2;
          this.q3 = this.item.q3;
          this.q4 = this.item.q4;
        
          this.ambientales = this.item.ambientales;
          this.rango = this.metologicas.relacion || "NA";              
          if (this.item.type == "3") {
            this.api.getnominaluno(this.metologicas.clase, this.metologicas.diametro).subscribe((resp: any) => {
              if (resp.ok) {
                this.nominales = resp.data.valores;
                this.nominaluno = this.nominales[0];
                this.nominaldos = this.nominales[1];
                this.nominaltres = this.nominales[2];
              }
            });
          } else {
            this.api.getnominaldos(this.metologicas.relacion, this.metologicas.diametro).subscribe((resp: any) => {
              if (resp.ok) {
                this.nominales = resp.data.valores;
                this.nominaluno = this.nominales[0];
                this.nominaldos = this.nominales[1];
                this.nominaltres = this.nominales[2];
              }
            });
          }
  
          this.descargar(this.id, "certificado");
        }
      })
    }).catch((error:any)=>{

    })
 
  }


  descargar(id, tipo) {
    this.api.downloadCertificado(id, tipo).subscribe((resp: any) => {
      if (resp.ok) {
        this.datos = resp.data;
        this.inf = true
        this.ready = true;

        this.aux.dismissLoading();

        setTimeout(() => {
          this.print();
        }, 1500);
      }
    });

  }





  print() {
    let titulo=`${this.item.year}-${this.item.consecutivo}`;
    this.changeTitle(titulo);
    window.print();
    this.changeTitle('ServafAPP');  
  }












}
