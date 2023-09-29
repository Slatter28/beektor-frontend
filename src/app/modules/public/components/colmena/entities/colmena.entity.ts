import { Producto } from 'src/app/modules/admin/components/producto/entities/producto.entity';
import { User } from 'src/app/modules/auth/interfaces/user';

export class Colmena {
  _id: string;
  codigo: string;
  ubicacion: string;
  estado: boolean;
  produccion: number;
  peso: number;
  observacion: string;
  solicitud: boolean;
  fecha: Date;
  productoTemperatura: Producto;
  productoHumedad: Producto;
  usuario: User;

  constructor(
    _id: string,
    codigo: string,
    ubicacion: string,
    estado: boolean,
    produccion: number,
    peso: number,
    observacion: string,
    solicitud: boolean,
    fecha: Date,
    productoTemperatura: Producto,
    productoHumedad: Producto,
    usuario: User
  ) {
    this._id = _id;
    this.codigo = codigo;
    this.ubicacion = ubicacion;
    this.estado = estado;
    this.produccion = produccion;
    this.peso = peso;
    this.observacion = observacion;
    this.fecha = fecha;
    this.productoTemperatura = productoTemperatura;
    this.productoHumedad = productoHumedad;
    this.usuario = usuario;
    this.solicitud = solicitud;
  }
}
