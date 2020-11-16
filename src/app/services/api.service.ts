import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Global } from './global';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  //Clientes

  crearClientes(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearcliente', data, { headers: headers });
  }
  editClientes(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'editarcliente', data, { headers: headers });
  }
  GetClientes(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getclientes', { headers: headers });
  }

  crearother(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearother', data, { headers: headers });
  }

  GetOthers(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getallothers', { headers: headers });
  }




  //ORDENES
  Consecutivo(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'consecutivo', { headers: headers });
  }
  crearOrden(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearorden', data, { headers: headers });
  }
  getOrdenesOpen(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getordenopen', { headers: headers });
  }
  OpenOrden(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'orden/'+id, { headers: headers });
  }

  //ORDENESTRABAJO
  ConsecutivoTrabajo(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'consecutivotrabajo', { headers: headers });
  }
  crearOrdenTrabajo(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearordentrabajo', data, { headers: headers });
  }
  getOrdenTrabajo(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getordentrabajo/'+id, { headers: headers });
  }
  addInstrumentosTrabajo(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'addinstrumentos', data, { headers: headers });
  }
  getOrdenesTrabajo(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getordenopentrabajo', { headers: headers });
  }
  condiciones(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'condiciones', data, { headers: headers });
  }
  updateTest(id,prueba): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'updatetest/'+id+'/'+prueba, { headers: headers });
  }


  //updatemedidor
  updateMedidor(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatemedidor', data, { headers: headers });
  }

  updateMedidor2(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatemedidor2', data, { headers: headers });
  }

  derogar(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'derogar', data, { headers: headers });
  }






  // GetCloseOrden(): Observable<any> {
  //   let headers = new HttpHeaders().set("Content-Type", "application/json");
  //   return this.http.get(this.url + 'getordenclosetrabajo', { headers: headers });
  // }

  GetCloseOrden(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'getordenclosetrabajo', data, { headers: headers });
  }



  GetOrdenClosed(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getordenclose/'+id, { headers: headers });
  }
  crearOrdenTrabajo2(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearordentrabajo2', data, { headers: headers });
  }
  addmedidores(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'asociarmedidores', data, { headers: headers });
  }
  GetOMedidoresTrabajo(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmedidorescalibracion/'+id, { headers: headers });
  }
  iniciales(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'iniciales', data, { headers: headers });
  }
  setfinales(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'finales', data, { headers: headers });
  }
  savetime(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'savetime', data, { headers: headers });
  }
  getstatecorrida(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getcorridas/'+id, { headers: headers });
  }
  getpruebas(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getpruebas/'+id, { headers: headers });
  }
  updatepruebas(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatepruebas', data, { headers: headers });
  }
  closeordentrabajo(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'closeordentrabajo', data, { headers: headers });
  }
  generarinforme(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'generarInforme', data, { headers: headers });
  }
  getresultados(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getresultados/'+id, { headers: headers });
  }

  



  // getordenopen

  certificadoOrden(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getordencertificado/'+id, { headers: headers });
  }
  certificadoOrdenTrabajo(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'gettrabajocertificado/'+id, { headers: headers });
  }

  certificadoOrdenMedidores(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmedidores3/'+id, { headers: headers });
  }
  certificadoOrdenTrabajoMedidores(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmedidores4/'+id, { headers: headers });
  }

  certificadoTrabajo(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'getcertificadotrabajo', data, { headers: headers });
  }

  deletecalibracionresultado(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'deletecalibracion', data, { headers: headers });
  }




  //OPCIONESINSTRUMENTOS
  OpcionesInstrumentos(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'opcionesinstrumentos', { headers: headers });
  }

  getvolumen(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getvolumen', { headers: headers });
  }

  getcmc(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getcmc', { headers: headers });
  }

  updatecmc(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatecmc', data, { headers: headers });
  }

  crearcmc(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearcmc', data, { headers: headers });
  }


  //instrumentos
  crearInstrumento(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearinstrumento', data, { headers: headers });
  }
  updateInstrumento(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updateinstrumento', data, { headers: headers });
  }
  getAllInstrumentos(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getinstrumentos', { headers: headers });
  }
  getAllInstrumentosOrden(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getinstrumentosorden/'+id, { headers: headers });
  }
  updateDefaultInstrumento(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatedefaultinstrumentos', data, { headers: headers });
  }
  getDefaultInstrumentos(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getdefaultinstrumentos', { headers: headers });
  }
  updateDefaultParametros(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatedefaultparametros', data, { headers: headers });
  }
  getDefaultParametros(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getdefaultparametros', { headers: headers });
  }
  saveInstrumentosOrdenTrabajo(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'saveinstrumentostrabajo', data, { headers: headers });
  }
  getInstrumento(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getinstrumento/' + id, { headers: headers });
  }


  //Bancos
  crearBanco(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearbanco', data, { headers: headers });
  }
  updateBanco(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updatebanco', data, { headers: headers });
  }
  getBancos(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getbancos', { headers: headers });
  }


  //Normas
  getNormas(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getnormas', { headers: headers });
  }

  //Modelos
  crearModelo(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearmodelo', data, { headers: headers });
  }
  getModelo(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmodelo', { headers: headers });
  }

  //Marcas
  crearMarcas(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearmarca', data, { headers: headers });
  }
  getMarcas(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmarcas', { headers: headers });
  }

  //Incidencias
  crearIncidencias(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearincidencia', data, { headers: headers });
  }
  getIncidencias(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getincidencias', { headers: headers });
  }

  //Medidores
  crearMedidor(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'crearmedidor', data, { headers: headers });
  }
  getMedidoresOpen(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmedidoresopen', { headers: headers });
  }
  getMedidoresSave(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmedidoresave', { headers: headers });
  }
  cerrarIngreso(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'updateingreso', data, { headers: headers });
  }
  getingresos(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'getordenes', data, { headers: headers });
  }
  DeleteMedidor(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'deletemedidor/' + id, { headers: headers });
  }
  set(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'setmedidor', data, { headers: headers });
  }
  setedit(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'seteditmedidor', data, { headers: headers });
  }
  terminarorden(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'setclose', data, { headers: headers });
  }


  getOrden(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getorden/' + id, { headers: headers });
  }

  getMedidor(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmedidor/'+id, { headers: headers });
  }

  getMedidor2(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmedidor2/'+id, { headers: headers });
  }
  
  getMedidor3(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getmedidor3/'+id, { headers: headers });
  }

  downloadCertificado(id,tipo): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'download/'+tipo+'/'+id, { headers: headers });
  }

  getCalibraciones(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getcalibraciones/'+id, { headers: headers });
  }

  setcalibraciones(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'setcalibracion', data, { headers: headers });
  }

  deletehistoricocalibracion(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'deletehistoricocalibracion/'+id, { headers: headers });
  }


  getMedidores(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'calibrados', data, { headers: headers });
  }

  updateAmbientales(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'editarambientales', data, { headers: headers });
  }

  updatePropiedadesPruebas(datos): Observable<any> {
    let data = JSON.stringify(datos);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + 'editarpropiedades', data, { headers: headers });
  }

  generaragain(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'again/'+id, { headers: headers });
  }


  getnominaluno(id,diametro): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getnominaluno/'+id+'/'+diametro, { headers: headers });
  }

  getnominaldos(id,diametro): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getnominaldos/'+id+'/'+diametro, { headers: headers });
  }


  //TUTORIALES
  GetTutoriales(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'gettutorials', { headers: headers });
  }









































}
