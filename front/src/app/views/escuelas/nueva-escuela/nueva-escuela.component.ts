import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EscuelasService} from '../../../Services/escuelas.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nueva-escuela',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nueva-escuela.component.html',
  styleUrl: './nueva-escuela.component.css'
})
export class NuevaEscuelaComponent {
  title = '';
  id!: number;

  escuela: FormGroup = new FormGroup({
   
    Nombre_escuela: new FormControl('', [
      Validators.required,
      Validators.maxLength(70),
      Validators.minLength(3),
    ]),
    Ciudad: new FormControl('', [
      Validators.required,
      Validators.maxLength(70),
      Validators.minLength(3),
    ]),
    Nivel_educativo: new FormControl('', [
      Validators.required,
      Validators.maxLength(70),
      Validators.minLength(3),
    ]),
   
   
  });
  constructor(
    private escuelaServicio: EscuelasService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Proveedor';
    } else {
      this.title = 'Actualizar Proveedor';
      this.escuelaServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.escuela.patchValue({
          Nombre_escuela: res.Nombre_escuela,
          Ciudad: res.Ciudad,
          Nivel_educativo: res.Nivel_educativo,
          
        });
      });
    }
  }
  get f() {
    return this.escuela.controls;
  }

  grabar() {
    Swal.fire({
      title: 'Escuela',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.escuelaServicio
            .insertar(this.escuela.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'Escuela',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/escuelas']);
              this.id = 0;
            });
        } else {
          this.escuelaServicio
            .actualizar(this.escuela.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Escuela',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/escuelas']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Escuela',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }

}
