const form = document.querySelector('form')
const taskList = document.querySelector('.tasks')
const sortBtns = document.querySelectorAll('.sort button')

const tasks = JSON.parse(localStorage.getItem('tasks')) || []

function addNewTask(e) {
  e.preventDefault()

  const options = this.querySelectorAll('option')

  options.forEach(opt => {
    if (opt.selected) {
      const inpDescription = this.querySelector(
        'textarea[id="description"]'
      ).value
      const inpResponsible = this.querySelector('input[id="responsible"]').value
      const option = opt.innerText
      const optLevel = opt.value

      const task = {
        inpDescription,
        option,
        optLevel,
        inpResponsible,
        visible: true,
        status: 'pending'
      }

      tasks.push(task)
    }
  })

  populateStorage(tasks)
  displayTasks(tasks, taskList)
  this.reset()
}

function populateStorage(array) {
  localStorage.setItem('tasks', JSON.stringify(array))
}

function displayTasks(array = [], section) {
  section.innerHTML = array
    .map(item => {
      return `
      <li data-index=${array.indexOf(item)} class="${
        item.visible ? '' : 'hidden'
      }">
      <p class="id" id="${array.indexOf(item)}">Task ID: ${array.indexOf(
        item
      )}</p>
      <p class="status">Status: <span class="${item.status}">${
        item.status
      }</span> </p>
      <h2 class="description">${item.inpDescription}</h2>
      <div class="info">
      <p class="priority">${item.option}</p>
      <p class="responsible">${item.inpResponsible}</p>
      </div>
      <div class="buttons">
        <button class="openBtn" data-index=${array.indexOf(item)}>Open</button>
        <button class="closeBtn" data-index=${array.indexOf(
          item
        )}>Close</button>
        <button class="deleteBtn" data-index=${array.indexOf(
          item
        )}>Delete</button>
      </div>
    </li>
    `
    })
    .join('')
}

function handleClick(e) {
  const index = parseFloat(e.target.dataset.index)
  if (e.target.classList.contains('deleteBtn')) {
    tasks[index].visible = !tasks[index].visible
  } else if (e.target.classList.contains('openBtn')) {
    tasks[index].status = 'pending'
  } else if (e.target.classList.contains('closeBtn')) {
    tasks[index].status = 'done'
  }
  populateStorage(tasks)
  displayTasks(tasks, taskList)
}

function sortList() {
  const high = document.querySelector('.sort button#high')
  const low = document.querySelector('.sort button#low')

  if (high.classList.value === '' && low.classList.value === '') {
    this.classList.toggle('selected')
  } else if (this.classList.value === 'selected') {
    this.classList.toggle('selected')
  } else {
    high.classList.toggle('selected')
    low.classList.toggle('selected')
  }

  if (high.classList.value === 'selected') {
    const ordered = tasks.sort((a, b) => (a.optLevel > b.optLevel ? 1 : -1))

    displayTasks(ordered, taskList)
  } else if (low.classList.value === 'selected') {
    const ordered = tasks.sort((a, b) => (a.optLevel > b.optLevel ? -1 : 1))

    displayTasks(ordered, taskList)
  }
}

form.addEventListener('submit', addNewTask)

taskList.addEventListener('click', handleClick)

sortBtns.forEach(button => button.addEventListener('click', sortList))

displayTasks(tasks, taskList)
