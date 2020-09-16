const appDiv = document.querySelector('.app')
const itemController = document.querySelector('.itemController')
const form = document.querySelector('form')
const input = document.querySelector('input')

const validation = value => {
   return value && value !== ''
}

const emptyField = () => {
   input.value = ''
}

clearErr = () => {
   const errDiv = document.querySelector('.errDiv')
   errDiv && errDiv.remove()
}

addErr = () => {
   const errDiv = document.createElement('div')
   errDiv.classList.add("text-center", "errDiv")
   const errMessage = `
      Please enter something
   `
   errDiv.innerHTML = errMessage
   itemController.parentNode.insertBefore(errDiv, itemController.nextSibling)
   setTimeout(clearErr, 1500)
}

const makeItem = value => {
   return `
      <li class="form-control d-flex justify-content-between align-items-center">
         <div>${value}</div>
         <div class="deleteIcon">X</div>
      </li>
   `
}

const savedArr = JSON.parse(localStorage.getItem("todos"))

if (savedArr && savedArr.length) {
   const list = document.createElement('ul')
   savedArr.map(value => {
      const output = makeItem(value)
      list.innerHTML += output
   })
   itemController.parentNode.insertBefore(list, itemController.nextSibling)
} else {
   localStorage.setItem("todos", JSON.stringify([]))
}


const addItem = e => {
   const value = input.value
   emptyField()
   clearErr()
   if (validation(value)) {
      const output = makeItem(value)
      const ul = document.querySelector('ul')
      // let savedArr
      if (!ul) {
         const list = document.createElement('ul')
         list.innerHTML = output
         itemController.parentNode.insertBefore(list, itemController.nextSibling)
      } else {
         const list = document.querySelector('ul')
         list.innerHTML += output
      }
      const savedTodos = JSON.parse(localStorage.getItem("todos"))
      const savedTodosArr = savedTodos ? savedTodos : []
      savedTodosArr.push(value)
      localStorage.setItem('todos', JSON.stringify(savedTodosArr))
   } else {
      addErr()
   }
   e.preventDefault()
}

clickHandler = e => {
   if (e.target.classList.contains('deleteIcon')) {
      e.target.parentElement.remove()
      const savedTodos = JSON.parse(localStorage.getItem("todos"))
      let updatedArr = savedTodos.filter(item => item !== e.target.parentElement.firstElementChild.innerHTML)
      localStorage.setItem("todos", JSON.stringify(updatedArr))
   }
}

form.addEventListener('submit', addItem)
appDiv.addEventListener('click', clickHandler)
