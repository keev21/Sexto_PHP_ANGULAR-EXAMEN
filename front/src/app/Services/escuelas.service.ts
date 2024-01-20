import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iescuelas  } from '../Interfaces/iescuelas';


@Injectable({
  providedIn: 'root'
})
export class EscuelasService {

  private urlBase: string =
  'http://localhost/Sexto_PHP_ANGULAR-EXAMEN/Inventario/Controllers/Escuelas.Controller.php?op=';
constructor(private clientePhp: HttpClient) {}
todos(): Observable<Iescuelas[]> {
  return this.clientePhp.get<Iescuelas[]>(this.urlBase + 'todos');
}
insertar(escuela: Iescuelas ): Observable<any> {
  var prov = new FormData();
  prov.append('Nombre_escuela', escuela.Nombre_escuela);
  prov.append('Ciudad', escuela.Ciudad);
  prov.append('Nivel_educativo', escuela.Nivel_educativo);
  
  
  return this.clientePhp.post(this.urlBase + 'insertar', prov);
}
eliminar(id: number): Observable<any> {
  var prov = new FormData();
  prov.append('ID_escuela', id.toString());
  return this.clientePhp.post(this.urlBase + 'eliminar', prov);
}
uno(id: number): Observable<Iescuelas > {
  var prov = new FormData();
  prov.append('ID_escuela', id.toString());
  return this.clientePhp.post<Iescuelas >(this.urlBase + 'uno', prov);
}
actualizar(escuela: Iescuelas , id: number): Observable<any> {
  var prov = new FormData();
  prov.append('ID_escuela',  id.toString());
  prov.append('Nombre_escuela', escuela.Nombre_escuela);
  prov.append('Ciudad', escuela.Ciudad);
  prov.append('Nivel_educativo', escuela.Nivel_educativo);
  return this.clientePhp.post(this.urlBase + 'actualizar', prov);
}
}
