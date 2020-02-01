const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const crawlerParams = require('./crawlerParamService')

const execute = (req, res) => {
  return new Promise((resolve, reject) => {
    const step1 = login(nightmare)
    const step2 = openStory(step1)
    const step3 = playStory(step2)

    step3
      .end()
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch(error => {
        console.error('Search failed:', error)
        reject(error)
      })
  })
}

const login = (nightmareStack) => {
  return nightmareStack
    .goto(crawlerParams.startUrl)
    .click(crawlerParams.elements.buttonGoToLogin)
    .wait(crawlerParams.elements.inputUsername)
    .type(crawlerParams.elements.inputUsername, crawlerParams.username)
    .type(crawlerParams.elements.inputPassword, crawlerParams.password)
    .click(crawlerParams.elements.buttonLogin)
}

const openStory = (nightmareStack) => {
  return nightmareStack
    .wait(crawlerParams.defaultTimeout)
    .click(crawlerParams.elements.storiesHeader)
    .wait(crawlerParams.defaultTimeout)
    .click(crawlerParams.elements.selectedStory)
    .wait(crawlerParams.defaultTimeout)
    .wait(crawlerParams.elements.buttonStartStory)
    .click(crawlerParams.elements.buttonStartStory)
    // .wait(crawlerParams.elements.logoHeader, 30000)
    // .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
}

const playStory = (nightmareStack) => {
  const clickTimes1 = 5

  for (let i = 0; i < clickTimes1; i++) {
    nightmareStack
      .wait(crawlerParams.elements.buttonContinueStoryEnabled)
      .click(crawlerParams.elements.buttonContinueStoryEnabled)
  }

  nightmare.wait(60000)

  return nightmareStack
}

module.exports = {
  execute
}
