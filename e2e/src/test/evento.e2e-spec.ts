import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { EventoPage } from '../page/evento/evento.po';
import { browser } from 'protractor';

describe('workspace-project Evento', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let evento: EventoPage;

    const SLEEP_TIME = 1500;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        evento = new EventoPage();
    });

    it('Deberia crear evento', () => {
        const NOMBRE_EVENTO = "Fecha test";
        const REFERENCIA = "ref-Test";
        const PRECIO_ANTIGUO = 10000;
        const PRECIO_NUEVO = 9000;
        const FECHA_INICIO = "2022-10-11T00:00";
        const FECHA_FIN = "2022-10-12T00:00";

        page.navigateTo();
        navBar.clickBotonCrear();
        evento.ingresarNombre(NOMBRE_EVENTO);
        evento.ingresarFechaInicio(FECHA_INICIO);
        evento.ingresarFechaFin(FECHA_FIN);
        evento.clickBotonAgregarReferencia();

        browser.sleep(3000);
        evento.ingresarReferencia(REFERENCIA);
        evento.ingresarPrecioAntiguo(PRECIO_ANTIGUO);
        evento.ingresarPrecioNuevo(PRECIO_NUEVO);
        
        evento.clickBotonGuardarReferencia();
        browser.sleep(3000);
        
        evento.clickBotonGuardarEvento();

        expect(evento.obtenerValorNombre()).toEqual("");
    });

    it('Deberia mostrar error de fechas ya seleccionadas', () => {
        const NOMBRE_EVENTO = "Fecha test";
        const REFERENCIA = "ref-Test";
        const PRECIO_ANTIGUO = 10000;
        const PRECIO_NUEVO = 9000;
        const FECHA_INICIO = "2022-10-11T00:00";
        const FECHA_FIN = "2022-10-12T00:00";
        const FECHAS_YA_SELECCIONADAS = "Ya existen eventos dentro de las fechas seleccionadas";

        page.navigateTo();
        navBar.clickBotonCrear();
        evento.ingresarNombre(NOMBRE_EVENTO);
        evento.ingresarFechaInicio(FECHA_INICIO);
        evento.ingresarFechaFin(FECHA_FIN);
        evento.clickBotonAgregarReferencia();

        browser.sleep(SLEEP_TIME);
        evento.ingresarReferencia(REFERENCIA);
        evento.ingresarPrecioAntiguo(PRECIO_ANTIGUO);
        evento.ingresarPrecioNuevo(PRECIO_NUEVO);
        
        evento.clickBotonGuardarReferencia();
        
        evento.clickBotonGuardarEvento();
        expect(evento.getMensajeAdevertencia()).toEqual(FECHAS_YA_SELECCIONADAS);
    });

    it('Deberia listar eventos', () => {
        page.navigateTo();
        navBar.clickBotonListar();

        expect(evento.contarEventos()).toBeGreaterThanOrEqual(1);
    });

    it('Deberia suspender el evento', () => {
        const SUSPENDIDO = "Suspendido";

        page.navigateTo();
        navBar.clickBotonListar();

        evento.clickBotonSuspender();
        browser.sleep(SLEEP_TIME)
        expect(evento.getEstadoEvento()).toEqual(SUSPENDIDO);
    });

    it('Deberia activar el evento', () => {
        const SUSPENDIDO = "Activo";

        page.navigateTo();
        navBar.clickBotonListar();

        evento.clickBotonSuspender();
        browser.sleep(SLEEP_TIME);
        expect(evento.getEstadoEvento()).toEqual(SUSPENDIDO);
    });

    
    it('Deberia actualizar el evento', () => {
        const NOMBRE_EVENTO = "Evento actualizado test";

        page.navigateTo();
        navBar.clickBotonListar();

        evento.clickBotonActualizar();
        browser.sleep(SLEEP_TIME);
        evento.ingresarNombre(NOMBRE_EVENTO);

        evento.clickBotonGuardarEvento();
        expect(evento.obtenerValorNombre()).toEqual("");
    });
});
