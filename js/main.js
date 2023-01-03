const elFormCreate = document.getElementById('form-create')
const elFormEdit = document.getElementById('form-edit')
const elListGroupTodo = document.getElementById('list-group-todo')
const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')
const time = document.getElementById('time')
const elClose = document.getElementById('close')

// time elments
const fullDay = document.getElementById('full-day')
const elHour = document.getElementById('hour')
const elMinute = document.getElementById('minute')
const elSecond = document.getElementById('second')

let editItemId

// check
let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

if (todos.length) showTodos()

//setTodos to locaLstorage
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}

// show todos
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    elListGroupTodo.innerHTML = ''
    todos.forEach((item, i) => {
        elListGroupTodo.innerHTML += `
            <li ondblclick = "setCompleted(${i})" class="list-group-item d-flex justify-content-between ${item.complated == true ? 'complated' : ''}">
                ${item.text}
            <div class="todo-icons">
                <span class="opacity-50 me-2">${item.time}</span>
                <img onclick=(editTodo(${i})) src="./img/edit.svg" alt="edit icon" width="25" height="25">
                    <img onclick=(deleteTodo(${i})) src="./img/delete.svg" alt="delete icon" width="25" height="25">
            </div>
            </li >
        `
    })
}

// time
function getTime() {
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
    const year = now.getFullYear()
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'Junly',
        'August',
        'September',
        'Octomber',
        'November',
        'December',
    ]

    const month_title = now.getMonth()
    fullDay.textContent = `${date} ${months[month_title]}, ${year}`
    elHour.textContent = hour
    elMinute.textContent = minute
    elSecond.textContent = second
    return `${hour}:${minute} , ${date}.${month}.${year}`;
}

setInterval(getTime, 1000)

// show error
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message
    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 2000)
}

//get todos
elFormCreate.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = elFormCreate['input-create'].value.trim()
    console.log(todoText);

    if (todoText.length) {
        todos.push({ text: todoText, time: getTime(), complited: false })
        setTodos()
        showTodos()
    } else {
        showMessage('message-create', 'Please, Enter some todo...')
    }

    elFormCreate.reset()
})

// edit todos
elFormEdit.addEventListener('submit', (e) => {
    e.preventDefault()

    const todoText = elFormEdit['input-edit'].value.trim()
    console.log(todoText);

    if (todoText.length) {
        todos.splice(editItemId, 1,
            {
                text: todoText,
                time: getTime(),
                complited: false
            })
        setTodos()
        showTodos()
        close()
    } else {
        showMessage('message-edit', 'Please, Enter some todo...')
    }

    elFormEdit.reset()
})

// delete todo
function deleteTodo(id) {
    const deleteTodos = todos.filter((item, i) => {
        return i !== id
    })

    todos = deleteTodos
    setTodos()
    showTodos()
}

// setCompleted
function setCompleted(id) {
    const complatedTodos = todos.map((item, i) => {
        if (id == i) {
            return { ...item, complated: item.complated == true ? false : true }
        } else {
            return { ...item }
        }
    })
    todos = complatedTodos
    setTodos()
    showTodos()
}


// edidTodo
function editTodo(id) {
    open()
    editItemId = id
}

overlay.addEventListener('click', close)
elClose.addEventListener('click', close)
document.addEventListener('keydown', (e) => {
    if (e.which == 27) {
        close()
    }
})

//open
function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

//close
function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}