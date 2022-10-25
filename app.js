const todoContainer = document.querySelector('.todo--content');
const addBtn = document.querySelector('.add--btn');
const textInput = document.querySelector('.text--input');
const completedTodos = document.querySelector('.completed--todos');
const inCompleteTodos = document.querySelector('.incomplete--todos');
const todoTitle = document.querySelector('.todo--title');
const paginationNumbers = document.getElementById("pagination-numbers");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const errorMessage = document.querySelector('.error--msg')

const url = 'https://jsonplaceholder.typicode.com/todos';

let currentPage;
const paginationLimit = 15;
let page = 0;

const pageCount = data => {
  return Math.ceil(data.length / paginationLimit)
};

let todos;

const fetchData = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((todos) => getTodos(todos));
  return;
};

fetchData(url);

const getTodos = (todos) => {
  todos = todos;
  displayTodos(todos);
  allTodos(todos);
  
  getIncompleteTodos(todos);
  getCompletedTodos(todos);
  addNewTodo(todos);

  page = pageCount(todos)
  getPaginationNumbers(page);
};


const displayTodos = (todos) => {
  console.log(todos);
  let list = '';
  todos.map((todo) => {
    list += `
    <div class="todo--item">
      <div class="item--title">${todo.title}</div>
      <div class="item--status">${checkTodoStatus(todo.completed)}</div>
    </div>
    `
  });
  todoContainer.innerHTML = list;
  let listItem = document.querySelectorAll('.todo--item');
  setCurrentPage(1, listItem);
  updatePage(listItem)
}

const checkTodoStatus = value => {
  let status = '';
  value === true ? (status = 'COMPLETED') : (status = 'UNCOMPLETED');
  return status
}


const getIncompleteTodos = (todos) => {
  inCompleteTodos.onclick = () => {
    let uncompletedTodos = todos.filter((todo) => todo.completed === false);
    inCompleteTodos.classList.add('active');
    completedTodos.classList.remove('active');
    displayTodos(uncompletedTodos);
  }
};

const getCompletedTodos = (todos) => {
  completedTodos.onclick = () => {
    let completeTodos = todos.filter((todo) => todo.completed === true);
    completedTodos.classList.add('active');
    inCompleteTodos.classList.remove('active');
    displayTodos(completeTodos)
  }
}

const addNewTodo = (todos) => {
  addBtn.onclick = async () => {
      let newTodo = {
        title: textInput.value,
        completed: true,
        userId: 2
      };
      
      if (newTodo.title.length) {
        postData(newTodo, todos);
      } else {
        errorMessage.innerHTML = '* Title should not be empty'
      }
      setTimeout(() => {
        errorMessage.innerHTML = '';
      }, 2000);
      displayTodos(todos)
      textInput.value = '';
      inCompleteTodos.classList.remove('active');
      completedTodos.classList.remove('active');
  }
};

const postData = (data, todos) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => {
    return response.json()
  }).then((newData) => {
    todos.unshift(newData);
    displayTodos(todos);
    return newData
  })
}

const allTodos = todos => {
  todoTitle.onclick = () => {
    displayTodos(todos);
    inCompleteTodos.classList.remove('active');
    completedTodos.classList.remove('active');
  }
};

const appendPageNumber = index => {
  const pageNumber = document.createElement('button');
  pageNumber.className = 'pagination-number';
  pageNumber.innerHTML = index;
  pageNumber.setAttribute('page-index', index);
  pageNumber.setAttribute('aria-label', 'Page ' + index);

  paginationNumbers.appendChild(pageNumber);
}


const getPaginationNumbers = (pages) => {
  for (let i = 1; i <= pages; i++) {
    appendPageNumber(i)
  }
}

const setCurrentPage = (pageNum, data) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  data.forEach((item, index) => {
    item.classList.add('hidden');
    if (index >= prevRange && index < currRange) {
      item.classList.remove('hidden')
    }
  })
}

const updatePage = (data) => {
  document.querySelectorAll('.pagination-number').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page-index'));

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex, data)
      })
    }
  })
};

const handleActivePageNumber = () => {
  document.querySelectorAll('.pagination-number').forEach((button) => {
    button.classList.remove('active');

    const pageIndex = Number(button.getAttribute('page-index'));
    if (pageIndex === currentPage) {
      button.classList.add('active');
    }
  })
};

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};
 
const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};
 
const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }
 
  if (page === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

window.addEventListener('load', () => {
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
    todoContainer.innerHTML = list;
    let listItem = document.querySelectorAll('.todo--item');
    setCurrentPage(1, listItem);
    updatePage(listItem);
    prevButton.addEventListener('click', () => {
      setCurrentPage(currentPage - 1, listItem)
    });
    nextButton.addEventListener('click', () => {
      setCurrentPage(currentPage + 1, listItem)
    })
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayTodos(data));
})

