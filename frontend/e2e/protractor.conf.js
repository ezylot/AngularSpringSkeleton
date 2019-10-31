// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  plugins: [
    {
      package: 'protractor-image-comparison',
      options: {
        baselineFolder: './e2e/baseline/',
        formatImageName: `{tag}-{logName}-{width}x{height}`,
        screenshotPath: './e2e/actual-screenshots/',
        savePerInstance: true,
        autoSaveBaseline: true,
      },
    },
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        "--headless",
        "--window-size=1920,1080",
        "--disable-dev-shm-usage"
      ]
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    let jasmineReporters = require("jasmine-reporters");
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    jasmine.getEnv().addReporter(new jasmineReporters.TeamCityReporter());
  }
};
