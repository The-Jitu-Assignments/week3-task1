const todoContainer = document.querySelector('.todo--content');
const addBtn = document.querySelector('.add--btn');
const textInput = document.querySelector('.text--input');
const completedTodos = document.querySelector('.completed--todos');
const inCompleteTodos = document.querySelector('.incomplete--todos');
const todoTitle = document.querySelector('.todo--title');

const url = 'https://jsonplaceholder.typicode.com/todos';

const fetchData = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((todos) => getTodos(todos));
  return;
};

fetchData(url);

const getTodos = (todos) => {
  let myTodos = todos.slice(0, 10);
  console.log(myTodos);
  displayTodos(myTodos);
  allTodos(myTodos);

  let inCompleteTodos = myTodos.filter((todo) => todo.completed === false);
  let completedTodos = myTodos.filter((todo) => todo.completed === true);
  
  getIncompleteTodos(inCompleteTodos);
  getCompletedTodos(completedTodos);
  addNewTodo(myTodos);
}

const displayTodos = (todos) => {
  let list = '';
  todos.map((todo) => {
    list += `
    <div class="todo--item">
      <div class="item--title">${todo.title}</div>
      <div class="item--status">${checkTodoStatus(todo.completed)}</div>
    </div>
    `
  });
  todoContainer.innerHTML = list
}

const checkTodoStatus = value => {
  let status = '';
  value === true ? (status = 'COMPLETED') : (status = 'UNCOMPLETED');
  return status
}

// const addData = async (url, data) => {
//   const response = await fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(data)
//   })
//   return response.json();
// }

// addBtn.onclick = () => {
//   let todo = {
//     title: textInput.value,
//     completed: true,
//     userId: 2
//   };

//   console.log(todo);

//   let data = addData(url, todo)
//   console.log(data.then((todo) => console.log(todo)))
//   textInput.value = '';
// }

const getIncompleteTodos = (todos) => {
  inCompleteTodos.onclick = () => {
    displayTodos(todos);
    inCompleteTodos.classList.add('active');
    completedTodos.classList.remove('active')
  }
};

const getCompletedTodos = (todos) => {
  completedTodos.onclick = () => {
    displayTodos(todos);
    completedTodos.classList.add('active');
    inCompleteTodos.classList.remove('active');
  }
}

const addNewTodo = (todos) => {
  addBtn.onclick = () => {
      let newTodo = {
        title: textInput.value,
        completed: true,
        userId: 2
      }
      todos.push(newTodo);
      displayTodos(todos);
      textInput.value = '';
      inCompleteTodos.classList.remove('active');
      completedTodos.classList.remove('active');
  }
};

const allTodos = todos => {
  todoTitle.onclick = () => {
    console.log(todos)
    displayTodos(todos);
    inCompleteTodos.classList.remove('active');
    completedTodos.classList.remove('active');
  }
};


