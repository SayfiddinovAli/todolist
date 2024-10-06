import React, { useEffect, useState } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import Footer from './Component/Footer/Footer';

import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [errorTitle, setErrorTitle] = useState(false); // Title uchun xatolik holati
  const [errorDescription, setErrorDescription] = useState(false); // Description uchun xatolik holati

  const handleAddToDo = () => {
    // Inputlarni tekshirish
    if (!newTitle || !newDescription) {
      // Xatolik bo'lsa, xabarni o'rnatamiz va qizil border beradi
      setErrorTitle(!newTitle); // Agar newTitle bo'sh bo'lsa
      setErrorDescription(!newDescription); // Agar newDescription bo'sh bo'lsa
      return;
    }
    
    let newToDoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newToDoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    
    // Xatolik xabarlarini tozalash va inputlarni tozalash
    setErrorTitle(false);
    setErrorDescription(false);
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setTodos(reducedTodo);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
  };

  const handleComplete = (index) => {
    let now = new Date();
    let completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    setCompletedTodos(reducedTodo);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>To Do List</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={errorTitle ? "Please fill out this field" : "What's the task title?"} // Agar xato bo'lsa, placeholder xabar
              className={errorTitle ? 'error-border' : ''} // Xatolik bo'lsa qizil border beradi
            />
          </div>
          <div className="todo-input-item">
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder={errorDescription ? "Please fill out this field" : "What's the task description?"} // Xato xabarini placeholderda ko'rsatish
              className={errorDescription ? 'error-border' : ''} // Qizil border xato bo'lsa
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddToDo} className="PrimaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && `active`}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && `active`}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div className="text">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="icon">
                  <MdOutlineDeleteOutline
                    className="iconcha"
                    onClick={() => handleDeleteTodo(index)}
                    title="Delete?"
                  />
                  <BsCheckLg
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                    title="Complete?"
                  />
                </div>
              </div>
            ))}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div className="text">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div className="icon">
                  <MdOutlineDeleteOutline
                    className="iconcha"
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title="Delete?"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
