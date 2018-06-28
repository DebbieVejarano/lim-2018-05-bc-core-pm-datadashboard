// VARIABLES
let contentdata = document.querySelector('.contentdata')
const mystyle = document.styleSheets[1]['cssRules']
const acc = document.getElementsByClassName('accordion')
let panel = document.querySelector('.panel')
const cohortGrid = document.querySelector('.grid2x2')
const usersArea = document.querySelector('#usersArea')
const users = document.querySelector('.users')
const searcharea = document.getElementsByClassName('searcharea')
const h1content = document.getElementById('h1content')
const h2content = document.getElementById('h2content')
const textpanel = document.getElementById('textpanel')
const searchbox = document.getElementById('searchbox')
const loader = document.getElementsByClassName('loader')


let progressRaw
let coursesRaws



// FETCH INICIALES
const dataCohorts = fetch('https://api.laboratoria.la/cohorts').then(response =>
  response.json()
)
const dataCampuses = fetch('https://api.laboratoria.la/campuses').then(
  response => response.json()
)

let campusesRaw
//Variables globales
let userRaw = []
let percent = new Object()
let courses = []
let usersWithStats = []
usersWithStats['stats'] = []
let filterNameArray = []
let computeCourses
Promise.all([dataCohorts, dataCampuses]).then(data => {
  displayShowHide(loader[0], 'hide')
  displayShowHide(contentdata, 'show')

  coursesRaw = data[0]
  campusesRaw = data[1]

  

  addCampuses()
  makeAccordeonButton()
})

//-------------------------------------------------------//
//FUNCION PARA MOSTRAR, OCULTAR Y HACER APARECER EL MENU
//-------------------------------------------------------//
let displayShowHide = (draw, att) => {
  att == 'show' ? (draw.style.display = 'block') : (draw.style.display = 'none')
}

//FUNCION PARA HACER UN CAMBIO ENTRE MOSTRAR Y OCULTAR
let displayToggle = draw => {
  draw.style.display === 'block'
    ? (draw.style.display = 'none')
    : (draw.style.display = 'block')
}

displayShowHide(loader[0], 'show')
displayShowHide(contentdata, 'hide')

let makeAccordeonButton = () => {
  acc[0].addEventListener('click', () => {
    panel = acc[0].nextElementSibling
    displayToggle(panel)
    acc[0].classList.toggle('active')
  })
}

let toggleSidebar = () => {
  x = mystyle[3].style['margin-left']
  y = mystyle[2].style['left']
  
  mystyle[3].style['margin-left'] = x == '232px' ? '0' : '232px'
  mystyle[2].style['left'] = y == '-232px' ? '0' : '-232px'
}

//-------------------------------------------------------//
// AÑADIMOS LOS CAMPUS A LOS BOTONES
//-------------------------------------------------------//
let addCampuses = () => {
  for (n in campusesRaw) {
    if (campusesRaw[n].active === true) {
      const namecampus = campusesRaw[n].name
      const idcampus = campusesRaw[n].id
      const button = document.createElement('button')
      button.addEventListener(
        'click',
        function() {
          showCohort(idcampus)
        },
        false
      )

      button.className = 'submenuButton'
      button.innerHTML = namecampus + ' ' + '<i class="fas fa-angle-right"></i>'

      panel.appendChild(button)
    }
  }
}

/*-------------------------------------------------------
 CUANDO DAN CLICK AL BOTON AGREGAMOS BOTONES
 CON EL NOMBRE DEL COHORT CORRESPONDIENTE
 GUARDAMOS EL ID PARA FUTUROS PROCESOS
-------------------------------------------------------*/
let showCohort = id => {
  // REMUEVE PARA DESPEJAR DIV CONTENEDOR COHORTS
  while (cohortGrid.firstChild) {
    cohortGrid.removeChild(cohortGrid.firstChild)
  }

  displayShowHide(searcharea[0], 'hide')
  displayShowHide(usersArea, 'hide')

  h1content.innerHTML = '/Cohorts'
  h2content.innerHTML = ''
  textpanel.innerHTML = 'Selecciona un campus del menu para comenzar:'

  // FILTRA LOS COHORTS POR ID QUE COINCIDA CON EL ID DEL CAMPUS
  coursesRaw.filter(x => {
    if (x.id.includes(id)) {
      const firstDiv = document.createElement('div')
      const secondDiv = document.createElement('div')

      firstDiv.className = 'buttoncohort'
      secondDiv.innerHTML = x.id
      secondDiv.innerHTML +=
        "<div class='subtext'> Alumnas " + x.usersCount + '</div>'
      firstDiv.addEventListener(
        'click',
        function() {
          loadUsersProgress(x.id)
        },
        false
      )
      cohortGrid.appendChild(firstDiv)
      firstDiv.appendChild(secondDiv)
    }
  })

  // REVIERTE LA POSICION
  let grid = Array.prototype.slice.call(cohortGrid.childNodes)
  for (let i = grid.length - 1; i >= 0; i--) {
    cohortGrid.appendChild(grid[i])
  }
}

/*-------------------------------------------------------
 CUANDO DAN CLICK AL BOTON DEL COHORT GUARDAMOS
 LA INFORMACION DEL COHORT DENTRO UN NUEVO ARREGLO
 Y CON EL ID HACEMOS FETCH DE LA DATA DE LOS USUARIOS
 Y EL PROGRESS.
 LLAMAMOS A LA FUNCION QUE PROCESARA TODA ESTA INFORMACION
-------------------------------------------------------*/
let loadUsersProgress = idCohort => {
  displayShowHide(contentdata, 'hide')

  h1content.innerHTML = ''
  h2content.innerHTML = `/Cohorts/${idCohort}`
  textpanel.innerHTML = ''

  loader[0].style.display = 'block'

  // REMUEVE PARA DESPEJAR DIV CONTENEDOR COHORTS
  while (cohortGrid.firstChild) {
    cohortGrid.removeChild(cohortGrid.firstChild)
  }

  // GUARDAMOS EL ID Y LO SEPARAMOS DE TODA LA DATA DE COHORT
  computeCourses(idCohort)

  const dataUsers = fetch(
    `https://api.laboratoria.la/cohorts/${idCohort}/users`
  ).then(response => response.json())

  const dataProgress = fetch(
    `https://api.laboratoria.la/cohorts/${idCohort}/progress`
  ).then(response => response.json())

  Promise.all([dataUsers, dataProgress]).then(data => {
    displayShowHide(contentdata, 'show')
    displayShowHide(loader[0], 'hide')

    progressRaw = data[1]
    usersRaw = data[0]

    opt = {
      cohort: coursesRaw,
      cohortData: {
        users: usersRaw,
        progress: progressRaw
      },
      orderBy: 'name',
      orderDirection: 'ASC',
      search: ''
    }
    
    processCohortData(opt)
    computeUsersStats(usersRaw, progressRaw, courses)
  })
}

/*----------------------------------
  CON TODA LA INFORMACION PROCESADA
  LA MOSTRAMOS EN PANTALLA
-----------------------------------*/
let showUsersProgress = array => {
  while (users.firstChild) {
    users.removeChild(users.firstChild)
  }

  searcharea[0].style.display =
    searcharea[0].style.display === 'block' ? 'none' : 'block'

  usersArea.style.display =
    usersArea.style.display === 'block' ? 'none' : 'block'

  array.map(user => {
    //CREAMOS UN DIV PARA EL USUARIO DENTRO DEL DIV CORRESPONDIENTE
    div = document.createElement('div')
    div.className = 'user'

    divName = document.createElement('div')
    divName.innerHTML = user.stats.name

    divReads = document.createElement('div')
    divReads.innerHTML = user.stats.reads.completed

    divExercises = document.createElement('div')
    divExercises.innerHTML = user.stats.exercises.completed

    divQuizzes = document.createElement('div')
    divQuizzes.innerHTML = user.stats.quizes.completed

    divTotal = document.createElement('div')
    divTotal.innerHTML = user.stats.percent

    users.appendChild(div)
    div.appendChild(divName)
    div.appendChild(divReads)
    div.appendChild(divExercises)
    div.appendChild(divQuizzes)
    div.appendChild(divTotal)
  })
}