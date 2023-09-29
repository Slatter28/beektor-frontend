import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Producto } from '../entities/producto.entity';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  getProducto(): Observable<any> {
    return this.http.get<any>('api/productos').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get<any>('api/productos/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http.post<any>('api/productos', producto).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateProducto(id: any, producto: Producto): Observable<any> {
    return this.http.put<any>(`api/productos/${id}`, producto).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete<any>('api/productos/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
