import { browser, by, element, ExpectedConditions, Key } from 'protractor';

export class EventoPage {

    private inputNombre = element(by.id('nombreEvento'));
    private inputFechaInicio = element(by.id('fechaInicioEvento'));
    private inputFechaFin = element(by.id('fechaFinEvento'));

    private buttonAgregarReferencia = element(by.id('agregarReferencia'));

    private inputReferencia = element(by.id('referencia'));
    private inputPrecioAntiguo = element(by.id('precioAntiguoReferencia'));
    private inputPrecioNuevo = element(by.id('precioNuevoReferencia'));

    private buttonGuardarReferencia = element(by.id('guardarReferencia'));
    private buttonGuardarEvento = element(by.id('guardarEvento'));

    private modalReferencia = element(by.id('exampleModal'));

    private botonSuspenderEvento = element(by.xpath('//*[@id="eventos"]/table/tbody/tr[1]/td[5]/button'));
    private textoEstadoEvento = element(by.xpath('//*[@id="eventos"]/table/tbody/tr[1]/td[4]'));

    private advertenciaText = element(by.id('advertencia'));

    private listaEventos = element.all(by.js(() => document.querySelector("#eventos > table > tbody > tr")));

    async ingresarNombre(nombre) {
        await this.inputNombre.sendKeys(nombre);
    }

    async ingresarFechaInicio(date) {
        await browser.executeScript(`document.getElementById('fechaInicioEvento').value='${date}'`);
        await this.inputFechaInicio.click();
        await this.inputFechaInicio.sendKeys(Key.ARROW_DOWN);
    }

    async ingresarFechaFin(date) {
        await browser.executeScript(`document.getElementById('fechaFinEvento').value='${date}'`);
        await this.inputFechaFin.click();
        await this.inputFechaFin.sendKeys(Key.ARROW_DOWN);
    }

    async clickBotonAgregarReferencia() {
        await this.buttonAgregarReferencia.click();
    }

    async ingresarReferencia(referencia) {
        await this.inputReferencia.sendKeys(referencia);
    }

    async ingresarPrecioAntiguo(precioAntiguo) {
        await this.inputPrecioAntiguo.sendKeys(precioAntiguo);
    }

    async ingresarPrecioNuevo(precioNuevo) {
        await this.inputPrecioNuevo.sendKeys(precioNuevo);
    }

    async clickBotonGuardarReferencia() {
        await this.buttonGuardarReferencia.click();
    }

    async clickBotonGuardarEvento() {
        await this.buttonGuardarEvento.click();
    }

    async obtenerValorNombre() {
        return this.inputNombre.getAttribute('value');
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

    async getEstadoEvento() {
        return this.textoEstadoEvento.getText();
    }

    async getMensajeAdevertencia() {
        await browser.wait(ExpectedConditions.visibilityOf(this.advertenciaText), 1000, this.advertenciaText.locator());
        return await this.advertenciaText.getText();
    }
}
