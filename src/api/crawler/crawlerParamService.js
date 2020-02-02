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
    buttonContinueStoryEnabled: '.play-controls button.continue:not([disabled])',
    multipleChoiseChallenge: '.multiple-choice-challenge',
    multipleChoiseChallengeList: '.multiple-choice-challenge .challenge-answers li',
    arrangeChallenge: '.arrange-challenge',
    arrangeChallengeList: '.arrange-challenge .phrase-bank .phrase',
    tapChallenge: '.tap-challenge',
    tapChallengeList: '.tap-challenge .tappable-phrase',
    matchChallenge: '.match-challenge',
    matchChallengeList: '.match-challenge .tokens li'
  },
  answers: {
    first: '… o que Julia quer comer.',
    second: 'Ele também é vegetariano.',
    third: 'Sim, isso mesmo.',
    fourth: '… mentiu sobre seu nome porque ele gostou da Julia.'
  },
  phraseSequences: {
    first: ['Where', 'are', 'you', 'from']
  },
  singleTapAnswer: {
    first: 'pets'
  },
  matchChallengeDatabase: [
    {
      en: 'Where',
      br: 'onde'
    },
    {
      en: 'But',
      br: 'mas'
    },
    {
      en: 'Yes',
      br: 'sim'
    },
    {
      en: 'you',
      br: 'você'
    },
    {
      en: 'is',
      br: 'é'
    },
    {
      en: 'No',
      br: 'não'
    },
    {
      en: 'want',
      br: 'quer'
    },
    {
      en: 'salad',
      br: 'salada'
    }
  ]
}

module.exports = crawlerParam
