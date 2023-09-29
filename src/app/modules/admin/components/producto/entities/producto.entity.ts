import { Proveedor } from '../../proveedor/entities/proveedor.entity';

export class Producto {
  _id?: string;
  nombre: string;
  detalle: string;
  stock: number;
  categoria: string;
  proveedor: Proveedor;
  precio: number;

  constructor(
    nombre: string,
    detalle: string,
    stock: number,
    categoria: string,
    proveedor: Proveedor,
    precio: number
  ) {
    this.nombre = nombre;
    this.detalle = detalle;
    this.stock = stock;
    this.categoria = categoria;
    this.proveedor = proveedor;
    this.precio = precio;
  }
}
