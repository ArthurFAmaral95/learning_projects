const form = document.querySelector('form')
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
        visible: true,
        status: 'open'
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
      <p class="status">Status: <span class="${item.status}">${
        item.status
      }</span> </p>
      <h2 class="description">${item.inpDescription}</h2>
      <div class="info">
      <p class="severity">${item.option}</p>
      <p class="responsible">${item.inpResponsible}</p>
      </div>
      <div class="buttons">
        <button class="openBtn" data-index=${i}>Open</button>
        <button class="closeBtn" data-index=${i}>Close</button>
        <button class="deleteBtn" data-index=${i}>Delete</button>
      </div>
    </li>
    `
    })
    .join('')
}

function handleClick(e) {
  const index = parseFloat(e.target.dataset.index)
  if (e.target.classList.contains('deleteBtn')) {
    issues[index].visible = !issues[index].visible
  } else if (e.target.classList.contains('openBtn')) {
    issues[index].status = 'open'
  } else if (e.target.classList.contains('closeBtn')) {
    issues[index].status = 'closed'
  }
  populateStorage(issues)
  displayIssues(issues, issueList)
}

form.addEventListener('submit', addNewIssue)

issueList.addEventListener('click', handleClick)

displayIssues(issues, issueList)
