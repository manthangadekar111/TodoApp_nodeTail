import React, { useState, useEffect } from 'react';

export default function Submitform() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    const addTask = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, { text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const completeTodo = (index) => {

        setTodos((prevTodos) => {
            const updatedTodos = [...prevTodos];
            const completedTodo = updatedTodos.splice(index, 1)[0];
            completedTodo.completed = true;

            return [...updatedTodos, completedTodo];
        });
        console.log(todos);

    };


    const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };
    const resetTodos = () => {
        setTodos([]);
    };

    return (
        <div className='submitform'>
            <input
                type='text'
                value={inputValue}
                placeholder='Enter a task'
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className='submitbtn' onClick={addTask}>Submit</button>
            <button className='reset-button' onClick={resetTodos} >Reset</button>
            <ul className='todoListItem'>
                {todos.map((todo, index) => (
                    <li key={index} className={todo.completed ? 'completed' : ''}>
                        {todo.text}
                        <div className="buttons">
                            {!todo.completed ? <button className="com-uncom" onClick={() => completeTodo(index)}>Uncompleted</button> :
                                <button className="com-uncom" onClick={() => completeTodo(index)}>Completed</button>
                            }
                            <button className='removebtn' onClick={() => removeTodo(index)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}
