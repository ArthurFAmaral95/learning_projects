const form = document.querySelector('form')
const openBtn = document.querySelectorAll('.open')
const closeBtn = document.querySelectorAll('.close')
const delBtn = document.querySelectorAll('.delete')
const id = document.querySelector('.id')
const description = document.querySelector('.description')
const severity = document.querySelector('.severity')
const responsible = document.querySelector('.responsible')
const issueList = document.querySelector('.issue')

const issues = JSON.parse(localStorage.getItem('issues')) || []

function addNewIssue(e) {
  e.preventDefault()

  const options = this.querySelectorAll('option')

  options.forEach(opt => {
    if (opt.selected) {
      const inpDescription = this.querySelector(
        'textarea[id="description"]'
      ).value
      const inpResponsible = this.querySelector('input[id="responsible"]').value
      const option = opt.innerText

      const issue = {
        inpDescription,
        option,
        inpResponsible,
        visible: true
      }

      issues.push(issue)
    }
  })

  populateStorage(issues)
  displayIssues(issues, issueList)
  this.reset()
}

function populateStorage(array) {
  localStorage.setItem('issues', JSON.stringify(array))
}

function displayIssues(array = [], section) {
  section.innerHTML = array
    .map((item, i) => {
      return `
      <li data-index=${i} class="${item.visible ? '' : 'hidden'}">
      <p class="id" id="${i}">Issue ID: ${i}</p>
      <button class="open">Open</button>
      <h2 class="description">${item.inpDescription}</h2>
      <div class="info">
        <p class="severity">${item.option}</p>
        <p class="responsible">${item.inpResponsible}</p>
      </div>
      <div class="buttons">
        <button class="close" data-index=${i}>Close</button>
        <button class="delete" data-index=${i}>Delete</button>
      </div>
    </li>
    `
    })
    .join('')
}

//function removeIssue(array = [], section) {}

function handleClick(e) {
  if (e.target.classList.contains('delete')) {
    const index = parseFloat(e.target.dataset.index)
    issues[index].visible = !issues[index].visible
    populateStorage(issues)
    displayIssues(issues, issueList)
  }
}

form.addEventListener('submit', addNewIssue)

issueList.addEventListener('click', handleClick)

displayIssues(issues, issueList)
