import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Proveedor } from '../entities/proveedor.entity';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  constructor(private http: HttpClient) {}

  getProveedores(): Observable<any> {
    return this.http.get<any>('api/proveedores').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getProveedor(id: number): Observable<any> {
    return this.http.get<any>('api/proveedores/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  createProveedor(proveedor: Proveedor): Observable<any> {
    return this.http.post<any>('api/proveedores', proveedor).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateProveedor(id: any, proveedor: Proveedor): Observable<any> {
    return this.http.put<any>(`api/proveedores/${id}`, proveedor).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteProveedor(id: string): Observable<any> {
    return this.http.delete<any>('api/proveedores/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
