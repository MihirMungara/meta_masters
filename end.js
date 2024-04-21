const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const scoreImage = document.getElementById('scoreImage')
const yourRank = document.getElementById('yourRank')

const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const maxHighScores = 5

finalScore.innerText = `${mostRecentScore} points`

let img = (mostRecentScore > 90) ? '/assets/fullHeadedChicken.png'
  : (mostRecentScore > 40) ? '/assets/happyChick.png' : '/assets/noobEgg.png'

scoreImage.innerHTML = `<img src="${img}" width = 100>`

let rank = (mostRecentScore > 90) ? 'Full Headed Chicken'
  : (mostRecentScore > 40) ? 'Happy Chick' : 'Noob Egg'

yourRank.innerText = `Your Rank: ${rank}`

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
})

function saveHighScore (e) {
  console.log('clicked the save button!')
  e.preventDefault()

  const score = {
    score: mostRecentScore,
    name: username.value
  }

  highScores.push(score)

  highScores.sort((a, b) => {
    return b.score - a.score
  })

  highScores.splice(maxHighScores)

  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('index.html')
}
