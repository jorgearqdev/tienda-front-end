import { browser, by, element, ExpectedConditions, Key } from 'protractor';

export class EventoPage {

    private campoNombre = element(by.id('nombreEvento'));
    private campoFechaInicio = element(by.id('fechaInicioEvento'));
    private campoFechaFin = element(by.id('fechaFinEvento'));

    private botonAgregarReferencia = element(by.id('agregarReferencia'));

    private campoReferencia = element(by.id('referencia'));
    private campoPrecioAntiguo = element(by.id('precioAntiguoReferencia'));
    private campoPrecioNuevo = element(by.id('precioNuevoReferencia'));

    private botonGuardarReferencia = element(by.id('guardarReferencia'));
    private botonGuardarEvento = element(by.id('guardarEvento'));

    private modalReferencia = element(by.id('exampleModal'));

    private botonSuspenderEvento = element(by.xpath('//*[@id="eventos"]/table/tbody/tr[1]/td[5]/button[1]'));
    private botonActualizarEvento = element(by.xpath('//*[@id="eventos"]/table/tbody/tr[1]/td[5]/button[2]'));
 
    private textoEstadoEvento = element(by.xpath('//*[@id="eventos"]/table/tbody/tr[1]/td[4]'));

    private textoAdvertencia = element(by.id('advertencia'));

    private listaEventos = element.all(by.js(() => document.querySelector("#eventos > table > tbody > tr")));

    async ingresarNombre(nombre) {
        await this.campoNombre.clear();
        await this.campoNombre.sendKeys(nombre);
    }

    async ingresarFechaInicio(date) {
        await browser.executeScript(`document.getElementById('fechaInicioEvento').value='${date}'`);
        await this.campoFechaInicio.click();
        await this.campoFechaInicio.sendKeys(Key.ARROW_DOWN);
    }

    async ingresarFechaFin(date) {
        await browser.executeScript(`document.getElementById('fechaFinEvento').value='${date}'`);
        await this.campoFechaFin.click();
        await this.campoFechaFin.sendKeys(Key.ARROW_DOWN);
    }

    async clickBotonAgregarReferencia() {
        await this.botonAgregarReferencia.click();
    }

    async ingresarReferencia(referencia) {
        await this.campoReferencia.sendKeys(referencia);
    }

    async ingresarPrecioAntiguo(precioAntiguo) {
        await this.campoPrecioAntiguo.sendKeys(precioAntiguo);
    }

    async ingresarPrecioNuevo(precioNuevo) {
        await this.campoPrecioNuevo.sendKeys(precioNuevo);
    }

    async clickBotonGuardarReferencia() {
        await this.botonGuardarReferencia.click();
    }

    async clickBotonGuardarEvento() {
        await this.botonGuardarEvento.click();
    }

    async obtenerValorNombre() {
        return this.campoNombre.getAttribute('value');
    }

    async contarEventos() {
        return this.listaEventos.count();
    }

    async modalVisible() {
        return this.modalReferencia.isDisplayed();
    }

    async clickBotonSuspender() {
        await this.botonSuspenderEvento.click();
    }

    async obtenerEstadoEvento() {
        return this.textoEstadoEvento.getText();
    }

    async obtenerMensajeAdevertencia() {
        await browser.wait(ExpectedConditions.visibilityOf(this.textoAdvertencia), 1000, this.textoAdvertencia.locator());
        return await this.textoAdvertencia.getText();
    }

    async clickBotonActualizar() {
        await this.botonActualizarEvento.click();
    }
}
