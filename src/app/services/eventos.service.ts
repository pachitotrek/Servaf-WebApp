import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private newclient = new Subject<any>();
  private newmodelo = new Subject<any>();
  private newmarca = new Subject<any>();
  private newmedidor = new Subject<any>();
  private newincidencia = new Subject<any>();
  private newcalibracion = new Subject<any>();
  private newupdate = new Subject<any>();

  constructor() { }

  //NUEVOCLIENTE
  newClientAlert() {
    this.newclient.next();
  }
  getNewClient(): Observable<any> {
    return this.newclient.asObservable();
  }
  //EDITAR
  newUpdateAlert() {
    this.newupdate.next();
  }
  getNewupdate(): Observable<any> {
    return this.newupdate.asObservable();
  }
  //MODELO
  newModeloAlert() {
    this.newmodelo.next();
  }
  getNewModelo(): Observable<any> {
    return this.newmodelo.asObservable();
  }
  //MARCAS
  newMarcaAlert() {
    this.newmarca.next();
  }
  getNewMarca(): Observable<any> {
    return this.newmarca.asObservable();
  }

  //MEDIDORES
  newMedidorlert() {
    this.newmedidor.next();
  }
  getNewMedidor(): Observable<any> {
    return this.newmedidor.asObservable();
  }

  //MARCAS
  newIncidenciaAlert() {
    this.newincidencia.next();
  }
  getNewIncidencia(): Observable<any> {
    return this.newincidencia.asObservable();
  }
  //NUEVOCalibracion
  newCalibracionAlert() {
    this.newcalibracion.next();
  }
  getNewCalibracion(): Observable<any> {
    return this.newcalibracion.asObservable();
  }




}
