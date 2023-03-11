const form = document.querySelector('form')
const taskList = document.querySelector('.tasks')
const sortBtns = document.querySelectorAll('.sort button')
const filters = document.querySelectorAll('.filters')
const responsibleList = document.querySelector('.responsible_filter')
let filteredTasks = []
const tasks = JSON.parse(localStorage.getItem('tasks')) || []

const priorityFilter = document.querySelector('#priority_filter')

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
      const taskID = tasks.length + 1

      const task = {
        inpDescription,
        option,
        optLevel,
        inpResponsible,
        visible: true,
        status: 'pending',
        taskID
      }

      tasks.push(task)
    }
  })

  populateStorage(tasks)
  displayTasks(tasks, taskList)
  fillResponsibleFilter(tasks, responsibleList)
  this.reset()
}

function populateStorage(array) {
  localStorage.setItem('tasks', JSON.stringify(array))
}

function displayTasks(array = [], section) {
  section.innerHTML = array
    .map((item, i) => {
      return `
      <li data-index=${i} class="${item.visible ? '' : 'hidden'}">
      <p class="id" id="${item.taskID}">Task ID: ${item.taskID}</p>
      <p class="status">Status: <span class="${item.status}">${
        item.status
      }</span> </p>
      <h2 class="description">${item.inpDescription}</h2>
      <div class="info">
      <p class="priority">${item.option}</p>
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
  } else {
    const ordered = tasks.sort((a, b) => (a.taskID > b.taskID ? 1 : -1))

    displayTasks(ordered, taskList)
  }
}

function filterList(e) {
  const filterValue = e.target.value

  if (filterValue === 'high') {
    filteredTasks = tasks.filter(task => task.optLevel === '1')
  } else if (filterValue === 'medium') {
    filteredTasks = tasks.filter(task => task.optLevel === '2')
  } else if (filterValue === 'low') {
    filteredTasks = tasks.filter(task => task.optLevel === '3')
  } else if (filterValue === 'pending') {
    filteredTasks = tasks.filter(task => task.status === 'pending')
  } else if (filterValue === 'done') {
    filteredTasks = tasks.filter(task => task.status === 'done')
  } else if (e.target.name === 'responsible_filter') {
    filteredTasks = tasks.filter(task => task.inpResponsible === filterValue)
  } else if (filterValue === '') {
    filteredTasks = tasks
  }

  displayTasks(filteredTasks, taskList)
}

function fillResponsibleFilter(array = [], section) {
  const allResponsibles = ['']

  const addedResponsibles = array.map(item => {
    return allResponsibles.push(item.inpResponsible)
  })

  const singleResponsibles = [...new Set(allResponsibles)]

  const html = singleResponsibles
    .map(item => {
      return `
      <option value="${item}">${item}</option>
      `
    })
    .join('')

  section.innerHTML = html
}

form.addEventListener('submit', addNewTask)

taskList.addEventListener('click', handleClick)

sortBtns.forEach(button => button.addEventListener('click', sortList))

filters.forEach(filter => filter.addEventListener('input', filterList))

displayTasks(tasks, taskList)
fillResponsibleFilter(tasks, responsibleList)
