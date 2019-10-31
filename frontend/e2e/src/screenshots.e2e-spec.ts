import {AppPage} from './app.po';
import {browser, by, element} from 'protractor';

describe('screenshot regesstion tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should compare new component on title page with baseline', () => {
    page.navigateTo();
    expect(browser.imageComparison.checkScreen('title-newComponent', { /* some options*/ })).toEqual(0);
  });

  it('should compare angular material on title page with baseline', () => {
    page.navigateTo();

    let buttonElement = element(by.cssContainingText('span', 'Angular Material'));
    expect(buttonElement.isPresent()).toBeTruthy();
    buttonElement.click().then(
      () => expect(browser.imageComparison.checkScreen('title-angularMaterial', { /* some options*/ })).toEqual(0)
    );
  });
});
