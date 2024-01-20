import { Component } from '@angular/core';
import { Iescuelas } from '../../Interfaces/iescuelas';
import { EscuelasService } from '../../Services/escuelas.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-escuelas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './escuelas.component.html',
  styleUrl: './escuelas.component.css'
})
export class EscuelasComponent {
  title = 'Escuelas';
  escuelas: Iescuelas[];
  constructor(private escuelasServicio: EscuelasService) {}
  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.escuelasServicio.todos().subscribe((listaescuelas) => {
      this.escuelas = listaescuelas;
      console.log(listaescuelas);
    });
  }
  alerta() {
    Swal.fire('escuelas', 'Mensaje en escuelas', 'success');
  }
  eliminar(ID_escuela: number) {
    Swal.fire({
      title: 'escuelas',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.escuelasServicio.eliminar(ID_escuela).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'escuelas',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'escuelas',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }

}
