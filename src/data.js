//Variables globales
let userRaw = []
let campusesRaw
let percent = new Object()
let courses = []
let usersWithStats = []
usersWithStats['stats'] = []
let filterNameArray = []
let computeCourses
//***********************************


let computeUsersStats = (users, progress, courses) => {


  usersWithStats = []
  let computeCourses = idcohort => {
    courses = []
  
    for (n in coursesRaw) {
      if (coursesRaw[n].id === idcohort) {
        courses = coursesRaw[n]
      }
    }
  }
  
  let getPercent = (quantity, total) => {
    if (quantity === 0) {
      return 0
    } else {
      return Math.round((quantity / total) * 100)
    }
  }
  
  let getAverage = (score, total) => {
    return Math.round(score / total)
  }
  
  users.map(user => {
    let idUser = user.id
    let cohorUser = user.signupCohort
    let nameUser = user.name.toUpperCase()

    let percentUser = 0

    let numberQuiz = 0
    let completedQuiz = 0
    let percentQuiz = 0
    let scoreSum = 0
    let scoreAvg = 0

    let numberRead = 0
    let completedRead = 0
    let percentRead = 0

    let numberPractice = 0
    let completedPractice = 0
    let percentPractice = 0

    if (courses.id === cohorUser) {
      Object.keys(courses.coursesIndex).map(cohortName => {
        if (progress[idUser].hasOwnProperty(cohortName)) {
          percentUser = progress[idUser][cohortName].percent

          unitsArray = Object.entries(progress[idUser][cohortName].units)

          unitsArray.map(units => {
            Object.entries(units[1].parts).map(unit => {
              if (unit[1].type === 'read') {
                numberRead++
                completedRead += unit[1].completed
              } else if (unit[1].type === 'quiz') {
                numberQuiz++
                completedQuiz += unit[1].completed
                if (unit[1].completed === 0) {
                  scoreSum += 0
                } else {
                  scoreSum += unit[1].score
                }
              } else if (unit[1].type === 'practice') {
                numberPractice++
                completedPractice += unit[1].completed
              }
            })
          })
        }

        scoreAvg = getAverage(scoreSum, numberQuiz)
      })
    }

    percentRead = getPercent(completedRead, numberRead)
    percentQuiz = getPercent(completedQuiz, numberQuiz)
    percentPractice = getPercent(completedPractice, numberPractice)

    userStats = {}
    userStats.stats = {
      id: idUser,
      name: nameUser,

      percent: percentUser,
      exercises: {
        total: numberPractice,
        completed: completedPractice,
        percent: percentPractice
      },
      reads: {
        total: numberRead,
        completed: completedRead,
        percent: percentRead
      },
      quizes: {
        total: numberQuiz,
        completed: completedQuiz,
        percent: percentQuiz,
        scoreSum: scoreSum,
        scoreAvg: scoreAvg
      }
    }

    usersWithStats.push(userStats)
  })

  return usersWithStats
}

let sortUsers = (users, orderBy, orderDirection) => {
  if (orderBy === 'nombre' || orderBy === 'name') {
    users.stats.sort((a, b) => {
      x = a.name
      y = b.name

      return x < y ? -1 : x > y ? 1 : 0
    })

    if (orderDirection === 'DESC') {
      users.stats.reverse()
    }
  }

  if (orderBy === 'porcentaje' || orderBy === 'percent') {
    users.stats.sort((a, b) => a.percent - b.percent)
    if (orderDirection === 'DESC') {
      users.stats.reverse()
    }
  }

  if (orderBy === 'pEjercicios' || orderBy === 'pExercises') {
    users.stats.sort((a, b) => a.exercises.percent - b.exercises.percent)
    if (orderDirection === 'DESC') {
      users.stats.reverse()
    }
  }

  if (orderBy === 'pQuizes' || orderBy === 'pquizes') {
    users.stats.sort((a, b) => a.quizes.percent - b.quizes.percent)
    if (orderDirection === 'DESC') {
      users.stats.reverse()
    }
  }

  if (orderBy === 'pQuizesAvg' || orderBy === 'pquizesavg') {
    users.stats.sort((a, b) => a.quizes.scoreAvg - b.quizes.scoreAvg)
    if (orderDirection === 'DESC') {
      users.stats.reverse()
    }
  }

  if (orderBy === 'pLecturas' || orderBy === 'pReads') {
    users.stats.sort((a, b) => a.reads.percent - b.reads.percent)
    if (orderDirection === 'DESC') {
      users.stats.reverse()
    }
  }
}

let filterUsers = (users, search) => {
  filterNameArray = []
  filterNameArray.stats = []

  users.filter(
    x =>
      x.stats.name.includes(search.toUpperCase())
        ? filterNameArray.stats.push(x)
        : 0
  )
  return filterNameArray
}

let processCohortData = options => {}

window.processCohortData = processCohortData
window.computeUsersStats = computeUsersStats
window.sortUsers = sortUsers
window.filterUsers = filterUsers
