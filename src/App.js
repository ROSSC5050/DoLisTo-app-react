import React,{useEffect, useState} from 'react';
import './App.css';
import {FiDelete} from 'react-icons/fi'
import {FaCheck} from 'react-icons/fa'

function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTodos,setTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [completedos,setcompletedos]=useState([]);

  const ahandleAdd =()=>{
    let newTodos ={
      title :newTitle,
      description:newDescription,
    }
    let updateTodo =[...allTodos];
    updateTodo.push(newTodos);
    setTodos(updateTodo);
    localStorage.setItem('todolist',JSON.stringify(updateTodo))
  };

  useEffect(()=>{
    let saveList= JSON.parse(localStorage.getItem('todolist'));
    let savecom= JSON.parse(localStorage.getItem('comptodo'));


    if(saveList){
      setTodos(saveList);
    }
    if(savecom){
      setcompletedos(savecom)
    }
  },[])
  const handdel =(index) => {
    let reduced=[...allTodos]
    reduced.splice(index,1)
    localStorage.setItem('todolist',JSON.stringify(reduced))
    setTodos(reduced)
  }
  const handdelcom=(index)=>{
    let reduced=[...completedos]
    reduced.splice(index,1)
    localStorage.setItem('comptodo',JSON.stringify(reduced))
    setcompletedos(reduced)
  }
  const handche =(index)=>{
    let now =new Date();
    let date= now.getDate();
    let month=now.getMonth()+1;
    let yaer =now.getFullYear();
    let hour =now.getHours();
    let min=now.getMinutes();
    let CompleteOn=date+'/'+month+'/'+yaer+ ' at '+hour +':'+min;
    let filterItem={
      ...allTodos[index],
      CompleteOn:CompleteOn
    }
    let updatecomp=[...completedos];
    updatecomp.push(filterItem);
    setcompletedos(updatecomp);
    handdel(index);
    localStorage.setItem ('comptodo', JSON.stringify(updatecomp))

  }


  return (
    <div className="App">
      <a href="https://rossc.netlify.app/"><button className='bb'>My Website</button></a>
      <a href="https://rosscqoute.netlify.app/"><button className='bbb'>InspiroQuote</button></a>
      
      <h1> <span>DO</span> LIS<span>TO</span></h1>
      <div className='todo-wrap'>
        <div className='todo-input'>
          <div className='todo-input-doitem'>
            <label >Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Title"/>
          </div>
          <div className='todo-input-doitem'>
            <label >Describtion</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="Description" />
          </div>
          <div className='todo-input-doitem'>
            <button type="button" onClick={ahandleAdd} className='pribtn'>ADD</button>
          </div>   
        </div>
        <div className='btn-ara'>
          <button className={`secbtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>TO DO TASK </button>
          <button className={`secbtn ${isCompleteScreen===true && 'active'}`}onClick={()=>setIsCompleteScreen(true)}>COMPLETED TASK</button>
        </div>
        {isCompleteScreen===false && allTodos.map((item,index) => {
          return(
            <div className='todo-listara' key ={index}>

            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>
              <FiDelete className='icon'onClick={()=>handdel(index)} title='delete?'/>
              <FaCheck className='check-icon' onClick={()=>handche(index)} title='Complete?'/>
            </div>
        </div>
          )
        })}

{isCompleteScreen===true && completedos.map((item,index) => {
          return(
            <div className='todo-listara' key ={index}>

            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><i>Complete On : {item.CompleteOn}</i></p>
            <div>
              <FiDelete className='icon'onClick={()=>handdelcom(index)} title='delete?'/>
            </div>
        </div>
          )
        })}
      </div>
     
    </div>
  );
}
export default App;
