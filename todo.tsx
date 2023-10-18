import React, { useState } from 'react';


interface ISTATE {
  id: number;
  text: string;
  completed: boolean;
}

const List: React.FC = () => {
  const [todos, setTodos] = useState<ISTATE[]>([]);
  const [text, setText] = useState<string>('');

  const addTodo = () => {
    if (text.trim() === '') return;
    const newTodo: ISTATE = {
      id: todos.length + 1,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setText('');
  };

 

  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <>
  
    <div className="container">
      <center><h1 className='display-4'>TODO LIST</h1></center>
      <div className="row">
      <div className="col-md-12">
     <center>
       <input type="text" value={text} onChange={(e)=>setText(e.target.value)} className='form-control' placeholder='add your tasks' />
       </center>
      
      </div>
      
       
     
      </div>
      <center><button className="btn btn-secondary mt-3" onClick={addTodo}>Add Tasks</button></center>
      <div className="row mt-2 ">
        <div className="col-md-12">
        <center>
 
  <ul className='bg bg-secondary'>
        {todos.map((todo) => (
          <li key={todo.id} className='fs-4'>
           
            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
            <center><button className="btn btn-dark text-light p-2 mx-2" onClick={()=>removeTodo(todo.id)}>Delete Tasks</button></center>
            
          </li>
        ))}
      </ul>
      
    </center>
        </div>
       
       
       

</div>

    </div>
    </>
  );
};

export default List;