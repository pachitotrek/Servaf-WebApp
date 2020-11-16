import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuxService } from 'src/app/services/auxiliar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  form:FormGroup;
  form2: FormGroup;
  edit:boolean=false;
  editpass:boolean=false;
  pannel:boolean=true;
  usuarios: any;


  constructor(private aux:AuxService,private uS:UserService) { 
    this.form= new FormGroup({
      nombre:new FormControl(null,Validators.required),
      apellido:new FormControl(null,Validators.required),
      username:new FormControl(null),
      creado:new FormControl(null),
      cargo :new FormControl(null,Validators.required),       
      role:new FormControl(null,Validators.required),
      pass:new FormControl(null),
      _id:new FormControl(null)  
    });

    this.form2= new FormGroup({
      pass:new FormControl(null,Validators.required),
      pass2:new FormControl(null,Validators.required),
      _id:new FormControl(null,Validators.required) 
  });

  }

  ngOnInit() {
    this.getUsuarios();
  }

  
  crear(){
    this.aux.createLoading().then((x:any)=>{     
      this.uS.register(this.form.value).subscribe((resp:any)=>{     
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Usuario ha sido creado");
            this.getUsuarios();
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

  
  getUsuarios(){
    this.uS.GetUsers().subscribe((resp:any)=>{
      if(resp.ok){
        this.usuarios=resp.usuarios;
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
    this.edit=true;
  }

  refresh(){
    this.editpass=false;
    this.pannel=true;
    this.form.reset();
  }

    
  update(){
    this.aux.createLoading().then((x:any)=>{     
      this.uS.update(this.form.value).subscribe((resp:any)=>{     
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Usuario ha sido actualizado");
           this.getUsuarios();
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

  


  updatePass(){
    this.aux.createLoading().then((x:any)=>{     
      this.uS.updatePass(this.form2.value).subscribe((resp:any)=>{     
        if(resp.ok){
          this.aux.dismissLoading().then((b:any)=>{
            this.aux.createAlert("Exito","El Ha cambiado la contraseña ha sido actualizada");
            this.getUsuarios();
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
