import { browser, logging } from 'protractor';

describe('workspace-project App', () => {

  beforeEach(() => {
    return browser.get(browser.baseUrl);
  });

  it('should display welcome message', () => {
    expect(browser.getTitle()).toEqual('Frontend');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
