import { Component } from '@angular/core';
import { Iprofesores } from '../../Interfaces/iprofesores';
import { ProfesoresService} from '../../Services/profesores.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent {
  title = 'Profesores';
  profesores: Iprofesores[];
  constructor(private profesoresServicio: ProfesoresService) {}
  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.profesoresServicio.todos().subscribe((listastock) => {
      this.profesores = listastock;
      console.log(listastock);
    });
  }
  alerta() {
    Swal.fire('profesores', 'Mensaje en profesores', 'success');
  }
  eliminar(ID_profesor: number) {
    Swal.fire({
      title: 'profesores',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesoresServicio.eliminar(ID_profesor).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'profesores',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'profesores',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
}
}
