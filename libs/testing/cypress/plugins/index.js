on('before:browser:launch', (browser = {}, launchOptions) => {
  if (browser.family === 'chromium' && browser.name !== 'electron') {
    launchOptions.args.push('--incognito')
    return launchOptions
  }

  if (browser.name === 'electron') {
    launchOptions.preferences.incognito = true
    return launchOptions
  }
})
