import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuxService } from 'src/app/services/auxiliar.service';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  form:FormGroup;
  form2: FormGroup;
  edit:boolean=true;
  editpass:boolean=false;
  pannel:boolean=true;
  usuario: any=[];
  ready:boolean=false;

  
  constructor(private aux:AuxService,private uS:UserService,private ls:LocalStorageService) { 
    this.form= new FormGroup({
      nombre:new FormControl(null,Validators.required),
      apellido:new FormControl(null,Validators.required),
      username:new FormControl(null,Validators.required),
      cargo :new FormControl(null,Validators.required),       
      role:new FormControl(null,Validators.required),
      pass:new FormControl(null),
      creado:new FormControl(null),
      _id:new FormControl(null)  
    });

    this.form2= new FormGroup({
      pass:new FormControl(null,Validators.required),
      pass2:new FormControl(null,Validators.required),
      _id:new FormControl(null,Validators.required) 
  });

  }

  ngOnInit() {
    this.getUsuario();
  }

    
  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.uS.register(this.form.value).subscribe((resp:any)=>{     
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Usuario ha sido creado");
            this.getDatosUsuario(this.usuario._id);
            this.form.reset();
          })
        }
      });

    }).catch((e:any)=>{
      this.aux.dismissLoading().then((b:any)=>{
        this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
      })

    })
  }
  
  update(){
    this.aux.createLoading().then((x:any)=>{     
      this.uS.update(this.form.value).subscribe((resp:any)=>{     
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Usuario ha sido actualizado");
            this.getUsuario();
            this.form.reset();
          })
        }
      });

    }).catch((e:any)=>{
      this.aux.dismissLoading().then((b:any)=>{
        this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
      })

    })
  }


  getDatosUsuario(id){
    this.uS.GetUser(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.usuario=resp.data[0];
        this.ready=true;
      }
    })
  }

  setPass(id){
    this.editpass=true;
    this.pannel=false;
    this.form2.patchValue({_id:id});
  }

  setUser(item){
    this.form.setValue(item);
  }

  refresh(){
    this.editpass=false;
    this.pannel=true;
  }

  getUsuario(){
    this.ls.cargarStorage('usuario').then((data:any)=>{
      this.usuario=data;  
      this.getDatosUsuario(this.usuario._id);      
    });
  }


  updatePass(){
    this.aux.createLoading().then((x:any)=>{     
      this.uS.updatePass(this.form2.value).subscribe((resp:any)=>{     
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Ha cambiado la contraseña ha sido actualizada");
            this.getUsuario();
            this.form2.reset();
          })
        }
      });

    }).catch((e:any)=>{
      this.aux.dismissLoading().then((b:any)=>{
        this.aux.createAlert("Error desconocido","Error por favor contacte con soporte");
      })

    })

  
  }

}
