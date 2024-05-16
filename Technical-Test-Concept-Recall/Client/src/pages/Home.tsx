import { useEffect, useState } from "react";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrash3Fill } from "react-icons/bs";

interface Todo {
  _id: string;
  id: number;
  task: string;
  done: boolean;
}

const Home = () => {
  const [task, setTask] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get('http://localhost:8000/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  };

  const addTodos = () => {
    axios.post('http://localhost:8000/add', { task })
      .then(result => {
        setTodos([...todos, result.data]);
        setTask('');
      })
      .catch(err => console.log(err));
  };

  const checkbox_Handle = (id: string) => {
    axios.put('http://localhost:8000/update/' + id)
      .then(() => {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        ));
      })
      .catch(err => console.log(err));
  };

  const deleteTodo = (id: string) => {
    axios.delete('http://localhost:8000/delete/' + id)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="px-4 py-2 border border-slate-500 rounded mr-2 flex-grow"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="px-4 py-2 border-slate-500 border-2 bg-slate-500 hover:bg-transparent hover:text-slate-500 text-white rounded"
            onClick={addTodos}
          >
            Add Todo
          </button>
        </div>
        {
          todos.length === 0
            ? <div><h2>No Record</h2></div>
            : todos.map(todo => (
              <div key={todo._id} className="flex items-center w-80 justify-between bg-slate-500 text-white h-9 mt-1 px-2 py-1">
                <div className="flex items-center" onClick={() => checkbox_Handle(todo._id)}>
                  {todo.done 
                    ? <BsFillCheckCircleFill className="mr-2 text-lg" /> 
                    : <BsCircleFill className="mr-2 text-lg" />}
                  <p>{todo.task}</p>
                </div>
                <div className="flex justify-center">
                  <span className="ml-2 " onClick={() => deleteTodo(todo._id)}>
                    <BsFillTrash3Fill className="cursor-pointer" />
                  </span>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
};


export default Home;
