import { by, element } from 'protractor';

export class NavbarPage {
    linkListar = element(by.xpath('/html/body/app-root/app-evento/app-navbar/nav/a[1]'));
    linkCrear = element(by.xpath('/html/body/app-root/app-evento/app-navbar/nav/a[2]'));
    barraNavegacion = element(by.id('barraNavegacion'));

    async clickBotonListar() {
        await this.linkListar.click();
    }

    async clickBotonCrear() {
        await this.linkCrear.click();
    }

    async barraEsVisible() {
        return this.barraNavegacion.isDisplayed();
    }
}
