export class EventoReferenciaProducto {
    id: number;
    idEvento: number;
    referencia: string;
    precioAntiguo: number;
    precioNuevo: number;

    constructor( id: number,
        idEvento: number,
        referencia: string,
        precioAntiguo: number,
        precioNuevo: number
    ) {
        this.id = id;
        this.idEvento = idEvento;
        this.referencia = referencia;
        this.precioAntiguo = precioAntiguo;
        this.precioNuevo = precioNuevo;
    }
}
