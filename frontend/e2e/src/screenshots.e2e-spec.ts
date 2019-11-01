import {browser, by, element} from 'protractor';

describe('screenshot regression tests', () => {

  beforeEach(() => {
    return browser.get(browser.baseUrl);
  });

  it('should compare title page with baseline', () => {
    expect(browser.imageComparison.checkScreen('title', { /* some options*/ })).toEqual(0);
  });
});
