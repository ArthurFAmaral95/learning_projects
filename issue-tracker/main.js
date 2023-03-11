const form = document.querySelector('form')
const taskList = document.querySelector('.tasks')
const sort = document.querySelector('.sort')
const sortBtns = document.querySelectorAll('.sort button')
const high = document.querySelector('.sort button#high')
const low = document.querySelector('.sort button#low')
const filters = document.querySelectorAll('.filters')
const responsibleList = document.querySelector('.responsible_filter')
let filteredTasks = []
const tasks = JSON.parse(localStorage.getItem('tasks')) || []

const priorityFilter = document.querySelector('#priority_filter')
const statusFilter = document.querySelector('#status_filter')
const responsibleFilter = document.querySelector('#responsible_filter')

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
    .map(item => {
      return `
      <li data-index=${item.taskID} class="${item.visible ? '' : 'hidden'}">
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
        <button class="openBtn" data-index=${item.taskID}>Open</button>
        <button class="closeBtn" data-index=${item.taskID}>Close</button>
        <button class="deleteBtn" data-index=${item.taskID}>Delete</button>
      </div>
    </li>
    `
    })
    .join('')
}

function handleClick(e) {
  const index = parseFloat(e.target.dataset.index) - 1
  if (e.target.classList.contains('deleteBtn')) {
    tasks[index].visible = !tasks[index].visible
  } else if (e.target.classList.contains('openBtn')) {
    tasks[index].status = 'pending'
  } else if (e.target.classList.contains('closeBtn')) {
    tasks[index].status = 'done'
  }

  populateStorage(tasks)
  displayTasks(filteredTasks, taskList)
}

function sortList(e) {
  sort.classList.remove('high')
  sort.classList.remove('low')
  sort.classList.add(e.target.id)

  if (high.classList.value === '' && low.classList.value === '') {
    this.classList.toggle('selected')
  } else if (this.classList.value === 'selected') {
    this.classList.toggle('selected')
  } else {
    high.classList.toggle('selected')
    low.classList.toggle('selected')
  }

  if (high.classList.value === 'selected') {
    const ordered = filteredTasks.sort((a, b) =>
      a.optLevel > b.optLevel ? 1 : -1
    )

    displayTasks(ordered, taskList)
  } else if (low.classList.value === 'selected') {
    const ordered = filteredTasks.sort((a, b) =>
      a.optLevel > b.optLevel ? -1 : 1
    )

    displayTasks(ordered, taskList)
  } else {
    const ordered = filteredTasks.sort((a, b) => (a.taskID > b.taskID ? 1 : -1))

    displayTasks(ordered, taskList)
  }
}

function filterList() {
  const selectedFilters = {
    priority: priorityFilter.value,
    status: statusFilter.value,
    responsible: responsibleFilter.value,
    sort: sort.classList[1]
  }

  if (
    selectedFilters.status === '' &&
    selectedFilters.responsible === '' &&
    selectedFilters.priority === ''
  ) {
    filteredTasks = tasks
  } else if (
    selectedFilters.status === '' &&
    selectedFilters.responsible === ''
  ) {
    filteredTasks = tasks.filter(
      task => task.option.toLowerCase() === selectedFilters.priority
    )
  } else if (
    selectedFilters.priority === '' &&
    selectedFilters.responsible === ''
  ) {
    filteredTasks = tasks.filter(task => task.status === selectedFilters.status)
  } else if (selectedFilters.status === '' && selectedFilters.priority === '') {
    filteredTasks = tasks.filter(
      task => task.inpResponsible === selectedFilters.responsible
    )
  } else if (selectedFilters.responsible === '') {
    filteredTasks = tasks.filter(
      task =>
        task.option.toLowerCase() === selectedFilters.priority &&
        task.status === selectedFilters.status
    )
  } else if (selectedFilters.status === '') {
    filteredTasks = tasks.filter(
      task =>
        task.option.toLowerCase() === selectedFilters.priority &&
        task.inpResponsible === selectedFilters.responsible
    )
  } else if (selectedFilters.priority === '') {
    filteredTasks = tasks.filter(
      task =>
        task.inpResponsible === selectedFilters.responsible &&
        task.status === selectedFilters.status
    )
  } else {
    filteredTasks = tasks.filter(
      task =>
        task.option.toLowerCase() === selectedFilters.priority &&
        task.status === selectedFilters.status &&
        task.inpResponsible === selectedFilters.responsible
    )
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
