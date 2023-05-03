const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.isHeadless) {
      // fullPage screenshot size is 1920x1080
      launchOptions.preferences.width = 1920;
      launchOptions.preferences.height = 1080;
      launchOptions.args.push('--window-size=1920,1080');
    }
    return launchOptions;
  });

};

