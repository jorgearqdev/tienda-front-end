export class ActualizarEstadoEvento {
    id: number;
    suspendido: string;

    constructor( id: number,
        suspendido: string
    ) {
        this.id = id;
        this.suspendido = suspendido;
    }
}
