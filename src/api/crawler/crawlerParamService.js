const crawlerParam = {
  startUrl: 'https://www.duolingo.com',
  username: process.env.DUOLINGO_USERNAME,
  password: process.env.DUOLINGO_PASSWORD,
  defaultTimeout: 7000,
  elements: {
    buttonGoToLogin: 'a[data-test="have-account"]',
    inputUsername: 'input[data-test="email-input"]',
    inputPassword: 'input[data-test="password-input"]',
    buttonLogin: 'button[data-test="register-button"]',
    logoHeader: 'a[data-test="home-nav"]',
    storiesHeader: 'a[data-test="stories-nav"]',
    selectedStory: '#react-root > div > div > div > div > div.whole-page.desktop > div.app-container > div > div > div > div:nth-child(2) > a:nth-child(4)',
    buttonStartStory: '.story-starter-start-story',
    buttonContinueStoryDisabled: '.play-controls button.continue:disabled',
    buttonContinueStoryEnabled: '.play-controls button.continue:not([disabled])'
  }
}

module.exports = crawlerParam
