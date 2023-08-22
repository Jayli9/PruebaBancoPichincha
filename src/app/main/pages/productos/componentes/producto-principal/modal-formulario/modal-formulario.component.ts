import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iproducto } from '../../../interfaces/Iproducto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from '../../../servicios/producto.service';
import * as moment from 'moment';
import { constante } from '../../../constantes/constante';
import { MensajesService } from '../../../servicios/mensajes.service';
@Component({
  selector: 'app-modal-formulario',
  templateUrl: './modal-formulario.component.html',
  styleUrls: ['./modal-formulario.component.css']
})

export class ModalFormularioComponent  {
  //Variables
  public productoEditar = false;
  public productoDTO: Iproducto;
  public fechaActual = moment(new Date()).format("YYYY-MM-DD")
  /*Formularios*/

  constructor(
    private formBuilder: FormBuilder,
    public dialogoFormulario: MatDialogRef<ModalFormularioComponent>,
    private servicioProducto: ProductoService,
    private servicioMensaje: MensajesService
  ) {
    this.productoDTO = {};
  }
  setProducto(producto: Iproducto) {
    if (Object.keys(producto).length === 0) {
      this.productoEditar = false;
    } else {
      this.productoEditar = true;
      this.productoDTO = { ...producto };
      this.productoDTO.date_release = moment(this.productoDTO.date_release).format("YYYY-MM-DD")
      this.productoDTO.date_revision = moment(this.productoDTO.date_revision).format("YYYY-MM-DD")
    }

  }

  ngOnInit() {
  }
  // metodo para guardar un producto
  async guardarProducto(productoEnvio: Iproducto): Promise<void> {
    await new Promise((resolve, reject) => {
      this.servicioProducto.buscarProducto(productoEnvio).subscribe({
        next: (respuesta) => {
          if (!respuesta) {
            //validar si existe identificador del producto
            this.servicioProducto.guardarProductos(productoEnvio).subscribe({
              next: (respuesta) => {
                this.servicioMensaje.mensajeCorrecto("", "Registro creado")
              }
            })
          } else {
            this.servicioMensaje.mensajeError("", "Identificación Duplicada, no se puede agregar el registro");
          }
          resolve('ok')
        }
      })
    })
    this.dialogoFormulario.close(true);
  }

  // metodo para actualizar un producto
  actualizarProducto(productoEnvio: Iproducto): void {
    this.servicioProducto.actualizarProductos(productoEnvio).subscribe({
      next: (respuesta) => {
        this.servicioMensaje.mensajeCorrecto("", "Registro actualizado")
      }
    })
    this.dialogoFormulario.close(true);

  }

  //calcular un año para la revisión
  calcularRevision(productoDTO: Iproducto) {
    const fechaRelease = productoDTO.date_release ?? new Date();
    let nuevaFecha = new Date(fechaRelease).setFullYear(new Date(fechaRelease).getFullYear() + constante.anioCalculo)
    productoDTO.date_revision = moment(new Date(nuevaFecha)).format("YYYY-MM-DD")
  }

  //validar que seleccione solo click
  prevenirEdicion(event: any) {
    event.preventDefault();
  }

}
