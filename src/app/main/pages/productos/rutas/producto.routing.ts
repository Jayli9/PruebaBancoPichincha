import { Routes } from '@angular/router';
//import { AuthGuard } from 'app/auth/helpers';
import { ProductoPrincipalComponent } from '../componentes/producto-principal/producto-principal.component';

export const RUTA_PRODUCTO: Routes = [
  {
    path: 'producto',
    component: ProductoPrincipalComponent,
    // canActivate: [AuthGuard],
  }
];