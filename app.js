const url = 'https://jsonplaceholder.typicode.com/todos';

const fetchData = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((todos) => getTodos(todos));
  return;
};

fetchData(url);

const getTodos = (todos) => {
  console.log(todos);
}

