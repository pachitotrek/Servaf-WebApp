import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { AuxService } from 'src/app/services/auxiliar.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-loaderimage',
  templateUrl: './loaderimage.component.html',
  styleUrls: ['./loaderimage.component.scss'],
})
export class LoaderimageComponent implements OnInit {
  @ViewChild('fileinput',{static:false}) fileinput :ElementRef;
  @Input()id :string='';
  @Input()type :string='';
  file: File;
  ImagenTemp: string;

  constructor(
    private upload:UploadService,private aux:AuxService,
    private eventos:EventosService,
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  uploadFile(){
    this.aux.createLoading().then((x:any)=>{
      this.upload.subirArchivo(this.file,this.type,this.id).then((data:any)=>{
        this.aux.dismissLoading().then((b:any)=>{
          this.aux.createAlert("Success","The Image Update");  
          this.modalController.dismiss();
        });
      }).catch((error:any)=>{
        this.aux.dismissLoading().then((b:any)=>{
          this.aux.createAlert("Error Image","Error When try Upload Photo");
          this.modalController.dismiss();
        });
      })
    }).catch((error:any)=>{
    });  
  }

  seleccionImagen(archivo:File){
    if(!archivo){
      this.file=null;
      return;
    } 
    if(archivo.type.indexOf('image')<0){
      let a=`Error`;
      let b = `Solo se aceptan imagenes`;
      this.aux.createAlert(a,b).then((a:any)=>{
        this.fileinput.nativeElement.value="";        
      }).catch((error:any)=>{       
      });      
      return;
    }   
    let reader = new FileReader();
    let UrlImageTemp = reader.readAsDataURL(archivo);
    reader.onloadend=()=>this.ImagenTemp=reader.result.toString();
    this.file=archivo;      
  }

}
