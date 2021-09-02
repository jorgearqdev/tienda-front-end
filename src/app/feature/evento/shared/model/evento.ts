import { EventoReferenciaProducto } from "./EventoReferenciaProducto";

export class Evento {
    id: number;
    nombre: string;
    fechaInicio: string | Date;
    fechaFin: string | Date;
    suspendido: string;
    eventoReferenciaProductos: Array<EventoReferenciaProducto>

    constructor(id: number,
        nombre: string,
        fechaInicio: Date | string,
        fechaFin: Date | string,
        suspendido: string,
        eventoReferenciaProductos: Array<EventoReferenciaProducto>) {

        this.id = id;
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.suspendido = suspendido;
        this.eventoReferenciaProductos = eventoReferenciaProductos;
    }
}
