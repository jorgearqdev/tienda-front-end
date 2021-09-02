import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { NavbarPage } from './page/navbar/navbar.po';

describe('workspace-project App', () => {
  let page: AppPage;
  
  let navigation: NavbarPage;
  beforeEach(() => {
    page = new AppPage();
    navigation = new NavbarPage();
  });

  it('Deberia mostrar la barra de navegacion', () => {
    page.navigateTo();
    expect(navigation.barraEsVisible()).toEqual(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
