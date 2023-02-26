const form = document.querySelector('form')
const open = document.querySelector('.open')
const close = document.querySelector('.close')
const del = document.querySelector('.delete')
const id = document.querySelector('.id')
const description = document.querySelector('.description')
const severity = document.querySelector('.severity')
const responsible = document.querySelector('.responsible')

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
  this.reset()
}

function populateStorage(array) {
  localStorage.setItem('issues', JSON.stringify(array))
}

function displayIssues(issues) {
  for (const issue in issues) {
    console.log(JSON.parse(issue))
  }
}

form.addEventListener('submit', addNewIssue)
