const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const crawlerParams = require('./crawlerParamService')

const execute = (req, res) => {
  return new Promise((resolve, reject) => {
    const stepLogin = login(nightmare)
    let stepOpenStory = null
    let stepPlayStory = null

    for (let i = 0; i < 2; i++) {
      stepOpenStory = openStory(stepLogin)
      stepPlayStory = playStory(stepOpenStory)
    }

    stepPlayStory
      .end()
      .then((res) => {
        console.log('Execução finalizada com sucesso!')
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
    .wait(crawlerParams.elements.storiesHeader)
    .click(crawlerParams.elements.storiesHeader)
}

const openStory = (nightmareStack) => {
  return nightmareStack
    .wait(crawlerParams.elements.selectedStory)
    .click(crawlerParams.elements.selectedStory)
    .wait(crawlerParams.elements.buttonStartStory)
    .click(crawlerParams.elements.buttonStartStory)
}

const playStory = (nightmareStack) => {
  nightmareStack = clickContinue(nightmareStack, 5)

  nightmareStack
    .wait(crawlerParams.elements.multipleChoiseChallenge)
    .evaluate(multipleChoiseChallenge, crawlerParams.answers.first, crawlerParams)

  nightmareStack = clickContinue(nightmareStack, 6)

  nightmareStack
    .wait(crawlerParams.elements.multipleChoiseChallenge)
    .evaluate(multipleChoiseChallenge, crawlerParams.answers.second, crawlerParams)

  nightmareStack = clickContinue(nightmareStack, 2)

  nightmareStack
    .wait(crawlerParams.elements.arrangeChallenge)
    .evaluate(arrangeChallenge, crawlerParams.phraseSequences.first, crawlerParams)

  nightmareStack = clickContinue(nightmareStack, 6)

  nightmareStack
    .wait(crawlerParams.elements.tapChallenge)
    .evaluate(tapChallenge, crawlerParams.singleTapAnswer.first, crawlerParams)

  nightmareStack = clickContinue(nightmareStack, 7)

  nightmareStack
    .wait(crawlerParams.elements.multipleChoiseChallenge)
    .evaluate(multipleChoiseChallenge, crawlerParams.answers.third, crawlerParams)

  nightmareStack = clickContinue(nightmareStack, 4)

  nightmareStack
    .wait(crawlerParams.elements.multipleChoiseChallenge)
    .evaluate(multipleChoiseChallenge, crawlerParams.answers.fourth, crawlerParams)

  nightmareStack = clickContinue(nightmareStack, 1)

  nightmareStack
    .wait(crawlerParams.elements.matchChallenge)
    .evaluate(matchChallenge, crawlerParams.matchChallengeDatabase, crawlerParams)

  nightmareStack = clickContinue(nightmareStack, 3)

  nightmareStack.wait(10000)

  return nightmareStack
}

const clickContinue = (nightmareStack, times) => {
  for (let i = 0; i < times; i++) {
    nightmareStack
      .wait(crawlerParams.elements.buttonContinueStoryEnabled)
      .click(crawlerParams.elements.buttonContinueStoryEnabled)
  }

  return nightmareStack
}

const arrangeChallenge = (sequence, crawlerParams) => {
  const wordsHTML = document.querySelectorAll(crawlerParams.elements.arrangeChallengeList)

  for (let i = 0; i < sequence.length; i++) {
    for (let j = 0; j < wordsHTML.length; j++) {
      const element = wordsHTML[j]
      const word = element.textContent

      if (word === sequence[i]) {
        element.click()
      }
    }
  }
}

const tapChallenge = (answer, crawlerParams) => {
  const wordsHTML = document.querySelectorAll(crawlerParams.elements.tapChallengeList)

  for (let j = 0; j < wordsHTML.length; j++) {
    const element = wordsHTML[j]
    const word = element.textContent

    if (word === answer) {
      element.click()
    }
  }
}

const matchChallenge = (database, crawlerParams) => {
  const tokensHTML = document.querySelectorAll(crawlerParams.elements.matchChallengeList)

  for (let i = 0; i < tokensHTML.length; i++) {
    const element = tokensHTML[i]
    const token = element.textContent
    let databaseCompare = null

    for (let j = 0; j < database.length; j++) {
      const itemDatabase = database[j]

      if (itemDatabase.en === token) {
        databaseCompare = itemDatabase.br
        element.childNodes[0].click()
      }
    }

    if (databaseCompare !== null) {
      for (let j = 0; j < tokensHTML.length; j++) {
        const elementCompare = tokensHTML[j]
        const tokenCompare = elementCompare.textContent

        if (databaseCompare === tokenCompare) {
          elementCompare.childNodes[0].click()
        }
      }
    } else {
      for (let j = 0; j < tokensHTML.length; j++) {
        const elementCompare = tokensHTML[j]

        element.childNodes[0].click()
        elementCompare.childNodes[0].click()
      }
    }
  }
}

const multipleChoiseChallenge = (rightAnswer, crawlerParams) => {
  const answersHTML = document.querySelectorAll(crawlerParams.elements.multipleChoiseChallengeList)

  for (let i = 0; i < answersHTML.length; i++) {
    const element = answersHTML[i]
    const phrase = element.textContent
    if (phrase === rightAnswer) {
      // button
      if (element.childNodes && element.childNodes[0]) {
        element.childNodes[0].click()
        return true
      } else {
        throw new Error('Não encontrei o botão para clicar!')
      }
    }
  }

  throw new Error('Não encontrei a resposta!')
}

module.exports = {
  execute
}
