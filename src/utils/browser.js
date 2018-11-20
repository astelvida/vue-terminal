const getBrowser = () => {
  let vendor = navigator.vendor.toLowerCase()
    let browser

    const findBrowserDetails = (name) =>
    navigator.appVersion.toLowerCase()
      .split(' ')
      .find(br => br.includes(name))

    if (vendor.indexOf('google') > -1) {
    browser = 'chrome';
  } else if (vendor.indexOf('apple') > -1) {
    browser = 'safari';
  } else if (vendor.indexOf('opera') > -1) {
    browser = 'opera';
  } else if (vendor.indexOf('mozilla') > -1) {
    browser = 'firefox';
  } else if (vendor.indexOf('microsoft') > -1) {
    browser = 'ie';
  }

  return findBrowserDetails(browser)
}

const getPlugins = () => {
  return Array.from(window.navigator.plugins)
        .map(plugin => ({ name: plugin.name, id: plugin.name }))
}

export {
  getPlugins,
  getBrowser
}
