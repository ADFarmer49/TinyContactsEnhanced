const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodoBtn');
const error = document.getElementById('error');

// Initialize local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
  // using .trim to remove whitespace  
  var todoText = todoInput.value.trim();
  
  // Creating if statement to prevent 'empty' tasks
  if (todoText !== '') {
    let todoItem = document.createElement('li');
    todoItem.innerText = todoText;
    // Creating delete button and functionality
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
      // Remove from DOM
      todoItem.remove();
      // Remove from local storage
      todos.splice(todos.indexOf(todoText), 1);
      localStorage.setItem('todos', JSON.stringify(todos));
    });
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
    todoInput.value = '';
    // Add todos to local storage
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
    // Hide error message
    error.style.display = "none";
  } else {
    // Show error message
    error.style.display = "block";
  }
}

// Add todos from local storage to DOM
todos.forEach(function(todoText) {
  let todoItem = document.createElement('li');
  todoItem.innerText = todoText;
  // Creating delete button and functionality
  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function() {
    // Remove from DOM
    todoItem.remove();
    // Remove from local storage
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  });
  todoItem.appendChild(deleteButton);
  todoList.appendChild(todoItem);
});

// Adding functionality to submit button
addTodoButton.addEventListener('click', function() {
  addTodo();
});


// Commented out - WIP - Can't get Enter key functionality to work //
/* todoInput.addEventListener('keypress', function(event) {
    console.log('key pressed');
    if (event.key === "Enter") {
      addTodo();
    }
  });
*/