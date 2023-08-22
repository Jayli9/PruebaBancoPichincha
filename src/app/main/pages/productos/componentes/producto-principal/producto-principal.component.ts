import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Iproducto } from '../../interfaces/Iproducto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { ModalFormularioComponent } from './modal-formulario/modal-formulario.component';
import { MensajesService } from '../../servicios/mensajes.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-producto-principal',
  templateUrl: './producto-principal.component.html',
  styleUrls: ['./producto-principal.component.css']
})

export class ProductoPrincipalComponent implements AfterViewInit {
  displayedColumns: string[] = ['logo', 'name', 'description', 'date_release', 'date_revision', 'accion'];
  dataSource: MatTableDataSource<Iproducto>;

  //variables 
  public productoDTO: Iproducto;
  public listaProductos: Iproducto[];
  //variables paginación y orden
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servicioProducto: ProductoService,
    private matPaginatorIntl: MatPaginatorIntl,
    private servicioMensaje: MensajesService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog) {
    this.listaProductos = [];
    this.productoDTO = {};
    this.dataSource = new MatTableDataSource();
  }
  async ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    await this.consultarProductos();
  }

  //función para filtrar datos 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //Función listar Productos
  async consultarProductos() {    
    this.spinnerService.show();
    await new Promise((resolve, reject) => {
      this.servicioProducto.listarProductos().subscribe({
        next: (respuesta) => {
          this.listaProductos = respuesta;
          this.dataSource = new MatTableDataSource(this.listaProductos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.matPaginatorIntl.itemsPerPageLabel = 'Elementos por página:';
          this.matPaginatorIntl.nextPageLabel = 'Siguiente:';
          this.matPaginatorIntl.previousPageLabel = 'Anterior:';
          resolve('ok')
        }
      })
    })
    this.spinnerService.hide();
  }
  //método para eliminar un registro
  async eliminarProducto(productoEnvio: Iproducto): Promise<void> {
    this.servicioProducto.eliminarProductos(productoEnvio).subscribe({
      next: (respuesta) => {
        console.log(respuesta)
      },
      error: (error) => {
        this.servicioMensaje.mensajeError("Error", "No se puede eliminar el registro: " + error.error)
      }
    })
    await this.consultarProductos();
  }
  //Abrir modal para edición y registro de un producto
  showModal(producto: Iproducto) {
    this.scrollToTop()
    let dialogRef: MatDialogRef<ModalFormularioComponent, any>
    dialogRef = this.dialog.open(ModalFormularioComponent, {
      autoFocus: true,
      disableClose: true,
      width: '50%'
    })
    dialogRef.componentInstance.setProducto(producto);
    dialogRef.afterClosed().subscribe(async (confirmado: Boolean) => {
      if (confirmado) {
        await this.consultarProductos();
      }
    })
  }

  scrollToTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

}
