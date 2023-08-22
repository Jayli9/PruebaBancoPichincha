import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
//Rutas
import { RouterModule } from '@angular/router';
//Guard
import { FormsModule } from '@angular/forms';
import { ProductoPrincipalComponent } from '../componentes/producto-principal/producto-principal.component';
import { RUTA_PRODUCTO } from '../rutas/producto.routing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalFormularioComponent } from '../componentes/producto-principal/modal-formulario/modal-formulario.component';
import localeEs from '@angular/common/locales/es';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RUTA_PRODUCTO),
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatSortModule,
        MatInputModule,
        MatDialogModule,
        NgxSpinnerModule

    ],
    declarations: [
        ProductoPrincipalComponent,
        ModalFormularioComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es' }, 
    ],
})
export class ProductoModule {
    constructor() {
        registerLocaleData(localeEs); // Registra los datos de formato para 'es'
      }
 }
