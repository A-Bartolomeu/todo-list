//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".task-filter");
const formatDay = document.querySelector("#day");
const formatMonth = document.querySelector("#month");
const formatYear = document.querySelector("#year");
const formatWeek = document.querySelector("#weekday");
const todoTotal = document.querySelector(".task-count");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Date
const now = new Date();
let day = now.getDate();
let year = now.getFullYear();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = weekDays[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
formatDay.innerHTML = `${day}`;
formatMonth.innerHTML = `${month}`;
formatYear.innerHTML = `${year}`;
formatWeek.innerHTML = `${weekDay}`;

//Functions
function addTodo(event) {
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Add todo to localStorage
  saveLocalTodos(todoInput.value);
  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append to list
  todoList.appendChild(todoDiv);
  //Clear todo input
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //Delete
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
const all = document.querySelector("#all");
const active = document.querySelector("#active");
const completed = document.querySelector("#completed");

//Filter
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        all.classList.add("is-active");
        completed.classList.remove("is-active");
        active.classList.remove("is-active");
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
          all.classList.remove("is-active");
          completed.classList.add("is-active");
          active.classList.remove("is-active");
        } else {
          todo.style.display = "none";
          all.classList.remove("is-active");
          completed.classList.add("is-active");
          active.classList.remove("is-active");
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
          all.classList.remove("is-active");
          completed.classList.remove("is-active");
          active.classList.add("is-active");
        } else {
          todo.style.display = "none";
          all.classList.remove("is-active");
          completed.classList.remove("is-active");
          active.classList.add("is-active");
        }
        break;
    }
  });
}

//Storage
function saveLocalTodos(todo) {
  //Check (Do I already have thing in ther?)
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  const todoCount = todos.length;
  todoTotal.innerHTML = `${todoCount} tasks`;
}
function getTodos() {
  //Check (Do I already have thing in ther?)
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    const todoCount = todos.length;
    todoTotal.innerHTML = `${todoCount} tasks`;
  });
}
function removeLocalTodos(todo) {
  //Check (Do I already have thing in ther?)
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  const todoCount = todos.length;
  todoTotal.innerHTML = `${todoCount} tasks`;
}
