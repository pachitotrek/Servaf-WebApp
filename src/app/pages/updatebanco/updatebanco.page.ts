import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UpdateComponent } from './update/update.component';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-updatebanco',
  templateUrl: './updatebanco.page.html',
  styleUrls: ['./updatebanco.page.scss'],
})
export class UpdatebancoPage implements OnInit {
  bancos: any = [];

  constructor(private api: ApiService, private aux: AuxService,private modalController:ModalController,private eventos:EventosService) {
    eventos.getNewupdate().subscribe((x:any)=>{
        this.getAll();
    })

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.api.getBancos().subscribe((resp: any) => {
      if (resp.ok) {
        this.bancos = resp.data;
        console.log(this.bancos);
      }
    })
  }

  async go(item) {
    const modal = await this.modalController.create({
      component: UpdateComponent,
      componentProps:{
        'item':item
      }  
    });
    return await modal.present();

  }



}
