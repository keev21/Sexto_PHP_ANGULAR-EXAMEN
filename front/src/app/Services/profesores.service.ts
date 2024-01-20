import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iprofesores } from '../Interfaces/iprofesores';
@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  private urlBase: string =
  'http://localhost/Sexto_PHP_ANGULAR-EXAMEN/Inventario/Controllers/Profesores.Controller.php?op=';
constructor(private clientePhp: HttpClient) {}
todos(): Observable<Iprofesores[]> {
  return this.clientePhp.get<Iprofesores[]>(this.urlBase + 'todos');
}
insertar(profesor: Iprofesores ): Observable<any> {
  var prov = new FormData();
  prov.append('ID_escuela', profesor.ID_escuela.toString());
  prov.append('nombre_profesor', profesor.nombre_profesor);
  prov.append('materia', profesor.materia);
  prov.append('salario', profesor.salario.toString());
  
  return this.clientePhp.post(this.urlBase + 'insertar', prov);
}
eliminar(id: number): Observable<any> {
  var prov = new FormData();
  prov.append('ID_profesor', id.toString());
  return this.clientePhp.post(this.urlBase + 'eliminar', prov);
}
uno(id: number): Observable<Iprofesores> {
  var prov = new FormData();
  prov.append('ID_profesor', id.toString());
  return this.clientePhp.post<Iprofesores >(this.urlBase + 'uno', prov);
}
actualizar(profesor: Iprofesores , id: number): Observable<any> {
  var prov = new FormData();
  prov.append('ID_profesor',  id.toString());
  prov.append('ID_escuela', profesor.ID_escuela.toString());
  prov.append('nombre_profesor', profesor.nombre_profesor);
  prov.append('materia', profesor.materia);
  prov.append('salario', profesor.salario.toString());
  return this.clientePhp.post(this.urlBase + 'actualizar', prov);
}

}
