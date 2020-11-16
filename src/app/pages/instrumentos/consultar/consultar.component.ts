import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SetcalibracionComponent } from 'src/app/components/setcalibracion/setcalibracion.component';
import { HistoricalibracionComponent } from 'src/app/components/historicalibracion/historicalibracion.component';
import { EventosService } from 'src/app/services/eventos.service';


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss'],
})
export class ConsultarComponent implements OnInit {
  instrumentos:any=[];

  constructor(private api:ApiService,private router:Router,public modalController: ModalController,private eventos:EventosService) {
   eventos.getNewCalibracion().subscribe((x:any)=>{
     this.getAll();
   })
   }

  ngOnInit() {
    this.getAll();
  }

  ionViewWillEnter() {
    this.getAll();
  }


  getAll(){
    this.api.getAllInstrumentos().subscribe((resp:any)=>{
      if(resp.ok){
        this.instrumentos=resp.data;
      }
    });
  }

  nav(id){
    this.api.getInstrumento(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.router.navigate([`/instrumentos/item/${id}`]);
      }
    })
  }

  async push(item) {
    const modal = await this.modalController.create({
      component: SetcalibracionComponent,
      componentProps:{
        'item':item
      },
      cssClass:'extralarge'
    });
    return await modal.present();
  }

  async look(id) {
    const modal = await this.modalController.create({
      component: HistoricalibracionComponent,
      componentProps:{
        'id':id
      },
      cssClass:'extralarge'
    });
    return await modal.present();
  }





}
