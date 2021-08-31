import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Evento } from '@producto/shared/model/evento.js';
import { EventoReferenciaProducto } from '@producto/shared/model/eventoReferenciaProducto';
import { EventoService } from '@producto/shared/service/evento.service';
import { catchError, map } from 'rxjs/operators';
import $ from '../../../../../assets/js/jquery-3.6.0.js'
declare var $: any;

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 120;
const LONGITUD_MAXIMA_PERMITIDA_NUMERICO = 2147483647;
const LONGITUD_MINIMA_PERMITIDA_NUMERICO = 1;

const ADVERTENCIA_PRECIO_NUEVO_MAYOR = "El precio nuevo no puede ser mayor o igual al antiguo precio"
const ADVERTENCIA_REFERENCIA_EXISTENTE = "La referencia ya está en la lista"

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  eventoForm: FormGroup;
  referenciaForm: FormGroup;


  constructor(protected eventoService: EventoService, public datepipe: DatePipe) { }

  public listadoReferencias: EventoReferenciaProducto[];

  ngOnInit() {
    this.listadoReferencias = [];
    this.construirFormularioEvento();
    this.construirFormularioReferencia();
  }

  crear() {
    let evento: Evento = this.eventoForm.value;
    evento.eventoReferenciaProductos = this.listadoReferencias;
    evento.fechaInicio = this.datepipe.transform(evento.fechaInicio, 'yyyy-MM-dd hh:mm:ss');
    evento.fechaFin = this.datepipe.transform(evento.fechaFin, 'yyyy-MM-dd hh:mm:ss');

    this.eventoService.guardar(evento).pipe(
      map(() => {
        this.eventoForm.reset();
      }),
      catchError((e: any) => {
        $("#advertencia").text(e.error.mensaje);
        $('#liveToast').toast('show');
        return null;
      }),
    ).subscribe();
  }

  agregarReferencia() {
    if (this.validateFormReferencia() || !this.referenciaForm.valid) {
      this.listadoReferencias.push(this.referenciaForm.value);
      $("#exampleModal").modal("hide");
      this.referenciaForm.reset();
    }
  }

  validateFormReferencia(): boolean {

    let advertencia: string;

    let formulario = this.referenciaForm.value;

    if (this.listadoReferencias.some(refrencia => refrencia.referencia === formulario.referencia)) {
      advertencia = ADVERTENCIA_REFERENCIA_EXISTENTE;
    }

    if (formulario.precioAntiguo <= formulario.precioNuevo) {
      advertencia = ADVERTENCIA_PRECIO_NUEVO_MAYOR;
    }

    if (advertencia) {
      $("#advertencia").text(advertencia);
      $('#liveToast').toast('show');
      return false;
    }
    return true;
  }

  private construirFormularioEvento() {
    this.eventoForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required])
    });
  }

  private construirFormularioReferencia() {
    this.referenciaForm = new FormGroup({
      referencia: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
      Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      precioAntiguo: new FormControl('', [Validators.required, Validators.min(LONGITUD_MINIMA_PERMITIDA_NUMERICO), Validators.max(LONGITUD_MAXIMA_PERMITIDA_NUMERICO)]),
      precioNuevo: new FormControl('', [Validators.required, Validators.min(LONGITUD_MINIMA_PERMITIDA_NUMERICO), Validators.max(LONGITUD_MAXIMA_PERMITIDA_NUMERICO)])
    });
  }

}
