
import { useState,useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
 //to store the enter avalue
  const [enteredvalue, setevalue] =useState("")
  const [act,setact]=useState([])

  useEffect(()=>{
    axios.get("http://localhost:5000/actlist")
    .then(function(response){
      console.log(response.data)
      setact(response.data)
      
    })
  },[])

  function handlevalue(evt)
  {
    setevalue(evt.target.value)
  }
  function add()
  {
   
      axios.post("http://localhost:5000/addact",{newact:enteredvalue})
      .then(function(response){
        setact(response.data)
        
      })

    setact([...act, {name:enteredvalue}])
    setevalue("")
  }

  function deleteAct(id) {
     axios.delete(`http://localhost:5000/deleteact/${id}`)
    .then(function(response) {
    setact(response.data); // Update state with latest list
    })
    .catch(function(error) {
     console.error("Delete failed:", error);
     });
    }
    
  return (

    <div className="container">
      <h1 className="header">Hi! This is your todo list</h1>
      <div>
        <div className= "input_cont">
        <input value = {enteredvalue} onChange={handlevalue}></input>
        <button className = "add" onClick={add}>Add</button>
        </div>
      
   {act.map(function(item)
   {
return (
<div key = {item._id}>
  <h1 >{item.name} <button className = "delt" onClick={() => deleteAct(item._id)}>Remove</button></h1>
 
  </div>
)

   }
   )}
      </div>

    </div>);
}

export default App;
