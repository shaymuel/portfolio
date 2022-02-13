const input = document.querySelector('.input');
const filter = document.querySelector('.filter');
const list = document.querySelector('.list');
const form = document.querySelector('.form');
let todoList = [];

//listening for submit button
form.addEventListener('submit', function(event) {
  event.preventDefault();
  addInput(input.value); 
});

//event listeners
list.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  if (event.target.classList.contains('delete-button')) {
    deleted(event.target.parentElement.getAttribute('data-key'));
  }
});

//switch statement event listener
filter.addEventListener("change", function(event) {
  todoList.forEach(function() {
  switch (event.target.value) {
    case "all":
      updateList(todoList);
      break;

    case "completed":
      completed(todoList)
      break;

    case "uncompleted":
      uncompleted(todoList)
      break;
}})}
);

//add item and push to local storage
function addInput(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
    todoList.push(todo);
    toLocalStorage(todoList);
    input.value = '';
  }
}

//Render the list for user to see
function updateList(todoList) {
  list.innerHTML = '';
  todoList.forEach(function(item) {
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    list.append(li);
  });
}

//function for filtering results if completed
function completed(todoList) {
  list.innerHTML = '';
  todoList.forEach(function(item) {
    if (item.completed === true) {
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    list.append(li);
  }});

}

//function for filtering results if uncompleted
function uncompleted(todoList) {
  list.innerHTML = '';
  todoList.forEach(function(item) {
    if (!(item.completed === true)) {
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    list.append(li);
  }});

}

//adding to local storage
function toLocalStorage(todoList) {
  localStorage.setItem('todoList', JSON.stringify(todoList));
  updateList(todoList);
}

//get from local storage
function fromLocalStorage() {
  if (localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    updateList(todoList);
  }
}

//toggle value
function toggle(id) {
  todoList.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  toLocalStorage(todoList);
}

//delete items from the array
function deleted(id) {
  todoList = todoList.filter(function(item) {
    return item.id != id;
  });
  toLocalStorage(todoList);
}

//grab from local storage
fromLocalStorage();


