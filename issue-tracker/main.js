const form = document.querySelector('form')
const open = document.querySelector('.open')
const close = document.querySelector('.close')
const del = document.querySelector('.delete')
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
        inpResponsible
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
    .map(item => {
      return `
      <li>
      <p class="id">Issue ID</p>
      <button class="open">Open</button>
      <h2 class="description">${item.inpDescription}</h2>
      <div class="info">
        <p class="severity">${item.option}</p>
        <p class="responsible">${item.inpResponsible}</p>
      </div>
      <div class="buttons">
        <button class="close">Close</button>
        <button class="delete">Delete</button>
      </div>
    </li>
    `
    })
    .join('')
}

form.addEventListener('submit', addNewIssue)

displayIssues(issues, issueList)
