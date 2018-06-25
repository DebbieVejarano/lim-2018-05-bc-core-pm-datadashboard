let mystyle = document.styleSheets[1]['cssRules']
let acc = document.getElementsByClassName('accordion')
let panel = document.querySelector('.panel')
let cohortGrid = document.querySelector('.grid2x2')

//BOTONES ESTILO ACORDEON
Object.keys(acc).map(x => {
  acc[x].addEventListener('click', () => {
    panel = acc[x].nextElementSibling
    panelDisplay = panel.style.display

    acc[x].classList.toggle('active')
    acc[x].nextElementSibling.style.display =
      panelDisplay === 'block' ? 'none' : 'block'
  })
})

// FUNCION NECESARIA PARA OCULTAR O HACER APARECER EL MENU
let toogleSidebar = () => {
  x = mystyle[3].style['margin-left']
  y = mystyle[2].style['left']

  mystyle[3].style['margin-left'] = x == '232px' ? '0' : '232px'
  mystyle[2].style['left'] = y == '-232px' ? '0' : '-232px'
}

let addButtonCampuses = () => {
  for (n in campusesRaw) {
    if (campusesRaw[n].active === true) {
      const namecampus = campusesRaw[n].name
      const idcampus = campusesRaw[n].id
      const button = document.createElement('button')
      button.addEventListener(
        'click',
        function() {
          loadCohort(idcampus)
        },
        false
      )

      button.className = 'submenuButton'
      button.innerHTML = namecampus + ' ' + '<i class="fas fa-angle-right"></i>'

      panel.appendChild(button)
    }
  }
}

let loadCohort = id => {

  // REMUEVE PARA DESPEJAR DIV CONTENEDOR COHORTS
  while (cohortGrid.firstChild) {
    cohortGrid.removeChild(cohortGrid.firstChild)
  }

  // FILTRA LOS COHORTS POR ID QUE COINCIDA CON EL ID DEL CAMPUS
  coursesRaw.filter(x => {
    if (x.id.includes(id)) {
      const firstDiv = document.createElement('div')
      const secondDiv = document.createElement('div')

      firstDiv.className = 'buttoncohort'
      secondDiv.innerHTML = x.id
      secondDiv.innerHTML += "<div class='subtext'> Alumnas " + x.usersCount + "</div>"
      cohortGrid.appendChild(firstDiv)
      firstDiv.appendChild(secondDiv)
    }
  })

  // REVIERTE LA POSICION
  let grid = Array.prototype.slice.call(cohortGrid.childNodes)
  for (let i = grid.length -1; i>=0; i--) {
    cohortGrid.appendChild(grid[i]);
}
}