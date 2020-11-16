import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuxService } from 'src/app/services/auxiliar.service';
import { ModalController } from '@ionic/angular';
import { ModalCMCComponent } from 'src/app/components/modal-cmc/modal-cmc.component';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalCMCNewComponent } from 'src/app/components/modal-cmcnew/modal-cmcnew.component';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit {
  items:any=[];
  form:FormGroup;
  cmc:any=[];

  constructor(private api:ApiService,private aux:AuxService,private modalController: ModalController,private eventos:EventosService) { 
    this.form=new FormGroup({
      _id:new FormControl(null,Validators.required),
      uno:new FormControl(null,Validators.required),
      uno_valor:new FormControl(null,Validators.required),
      dos:new FormControl(null,Validators.required),
      dos_valor:new FormControl(null,Validators.required),
      tres:new FormControl(null,Validators.required),
      tres_valor:new FormControl(null,Validators.required),
      cuatro:new FormControl(null,Validators.required),
      cuatro_valor:new FormControl(null,Validators.required)
    });

    eventos.getNewModelo().subscribe((x)=>{
      this.getDefaults();
    })

  }

  ngOnInit() {
    this.get();
    this.getDefaults();
  }


  get(){
    this.api.getvolumen().subscribe((resp:any)=>{
      if(resp.ok){
        this.items=resp.data;        
      }
    })
  }

  getDefaults(){
    this.api.getcmc().subscribe((resp:any)=>{
      if(resp.ok){
        this.cmc=resp.data;    

      }
    });
  }


  async update(item){

    const modal = await this.modalController.create({
      component: ModalCMCComponent,
      componentProps:{
        'item': item
      }        
    });
    return await modal.present();
  
  }

  
  async new(){
    const modal = await this.modalController.create({
      component: ModalCMCNewComponent,     
    });
    return await modal.present();
  
  }




}
