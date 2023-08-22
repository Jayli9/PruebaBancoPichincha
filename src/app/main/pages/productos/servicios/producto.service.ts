import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iproducto } from '../interfaces/Iproducto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) {

  }
 
  //listar productos
  listarProductos(): Observable<any> {
    return this.http.get<any>(`${environment.url_pruebas}/bp/products`);
  }
  //guardar productos
  guardarProductos(productoDTO:Iproducto): Observable<any> {
    return this.http.post<any>(`${environment.url_pruebas}/bp/products`,productoDTO);
  }
  //actualizar productos
  actualizarProductos(productoDTO:Iproducto): Observable<any> {
    return this.http.put<any>(`${environment.url_pruebas}/bp/products`,productoDTO);
  }
  //eliminar productos
  eliminarProductos(productoDTO:Iproducto): Observable<any> {
    let id=productoDTO.id;
    return this.http.delete<any>(`${environment.url_pruebas}/bp/products/?id=${id}`);
  }
  //eliminar productos
  buscarProducto(productoDTO:Iproducto): Observable<any> {
    let id=productoDTO.id;
    return this.http.get<any>(`${environment.url_pruebas}/bp/products/verification?id=${id}`);
  }
 
}
