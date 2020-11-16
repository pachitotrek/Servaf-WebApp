import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Global } from 'src/app/services/global';
import { ModalController } from '@ionic/angular';
import { LoaderimageComponent } from '../loaderimage/loaderimage.component';

@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.scss'],
})
export class MedidorComponent implements OnInit {
  @Input() id:any=[];
  item:any=[];
  resultados:any=[];
  q1:number=null;
  q2:number=null;
  q3:number=null;
  conforme:boolean=true;
 

  ready:boolean=false;
  url:string;

  constructor(private api:ApiService,private router:Router,private modalcontroller:ModalController) {
    this.url=Global.url;
   }

  ngOnInit() {   
    this.getMedidor(this.id)
  }

  getMedidor(id){
    this.api.getMedidor2(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.item=resp.data[0];    

        this.check();
             
      }
    })
  }



  check(){
    if(this.item.estado=="true"){
      this.resultados=this.item.resultados;
      this.conforme=true;
    }else{
      this.resultados=[];
      this.conforme=false;
    }

    this.ready=true;  
  }




  download(id){
    // let link = `${this.url}down/images/${id}`;
    // window.open(link, "_blank");

    // this.api.downloadCertificado(id).subscribe((resp:any)=>{
    //   if(resp.ok){

    //   }
    // });
    this.router.navigate([`/trabajo/generar/${id}`]);
  }


  go(id){
    this.router.navigate([`/trabajo/informe/${id}`]);
  }

  async upload(id){

    const modal = await this.modalcontroller.create({
      component: LoaderimageComponent,
      componentProps:{
        'id':id,
        'type':"medidor"
      }
    });
    return await modal.present();

  }

}
