import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfesoresService} from '../../../Services/profesores.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { Iescuelas } from '../../../Interfaces/iescuelas';
import { EscuelasService } from '../../../Services/escuelas.service';

@Component({
  selector: 'app-nuevo-profesor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-profesor.component.html',
  styleUrl: './nuevo-profesor.component.css'
})
export class NuevoProfesorComponent {
  title = 'Nuevo Stock';
  id!: number;

  ListaEscuelas: Iescuelas[];
  
  escuela: FormGroup = new FormGroup({
    ID_escuela: new FormControl('', Validators.required),
    nombre_profesor: new FormControl('', Validators.required),
    materia: new FormControl('', Validators.required),
    salario: new FormControl('', Validators.required),
  });
  constructor(
    private profesoresServicio: ProfesoresService,
    private rutas: Router,
    private parametros: ActivatedRoute,
    private escuelasServicio: EscuelasService,
    
  ) {}
  async ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    await this. cargaEscuela();

    
    
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Stock';
    } else {
      this.title = 'Actualizar Stock';
      this.profesoresServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.escuela.patchValue({
          ID_escuela: res.ID_escuela,
          nombre_profesor: res.nombre_profesor,
          materia: res.materia,
          salario: res.salario,
        });
      });
    }
  }
  
  cargaEscuela() {
    this.escuelasServicio.todos().subscribe((res) => {
      this.ListaEscuelas = res;
    });
  }

  get f() {
    return this.escuela.controls;
  }
  grabar() {
    Swal.fire({
      title: 'Productos',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.profesoresServicio.insertar(this.escuela.value).subscribe((res) => {
            Swal.fire({
              title: 'Productos',
              text: 'Se insertó con éxito el registro',
              icon: 'success',
            });
            this.rutas.navigate(['/profesores']);
            this.id = 0;
          });
        } else {
          this.profesoresServicio
            .actualizar(this.escuela.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Productos',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/profesores']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Productos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
