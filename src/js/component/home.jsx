import React from "react";
import { useState, useEffect } from "react/cjs/react.development";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const URL_USER = "https://assets.breatheco.de/apis/fake/todos/user/cesarVallenilla"

//create your first component
const Home = () => {
	const [inputValue, setImputValue] = useState('');
	const [ todos , setTodos ] = useState([]);


	const putToDo = async (copia) =>{
		let response = await fetch(URL_USER,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"PUT",
			body: JSON.stringify(copia) 
		})
		let data = await response.json()
		console.log(data);
		getToDo();
	}

	const getToDo = async () =>{
		let response = await fetch(URL_USER,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"GET",
		})
		let data = await response.json()
		setTodos(data)
	
		};


		

	useEffect(() => {
	getToDo()	
	}, [])

	function handleChange(e){
		const value= e.target.value
		setImputValue(value);
	}

		
	function handleAdd(e){
		let copia = [...todos];
		copia.push({label:inputValue,
			done: false});
		setTodos(copia);
		putToDo(copia);
		setImputValue('');

	}

	function handleKeyDown(e){
		
		if (e.key === 'Enter') {
			if(inputValue === ""){
				alert('Escribe una tarea');
				return
			}
			let copia = [...todos];
			// copia.push(inputValue);
			copia.push({label:inputValue,
			done: false});
			setTodos(copia);
			putToDo(copia);
			setImputValue('');

		} 
	}

	function handleDelete(id){
		let copia = [...todos];
		setTodos(copia.filter(num => num !== id));
		putToDo(copia.filter(num => num !== id));
	}
	
	return (
		<div className="appContainer">
			<h1>ToDo List</h1>
			<div className="container">
				<div className="todoImput">
					<input type="text" placeholder="Añadir Tarea" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown}/>
					<button onClick={handleAdd}>Crear Tarea</button>
				</div>
			<div className="todoContainer">
				{
					todos.map((todo,id)=> {
						return (
							<div className="newTodo" key={id}>
								{todo.label}
								<button onClick={()=>handleDelete(todo,id)}>X</button>
							</div>
						) 
					})
				}	
			</div>

			</div>
		</div>
	);
};

export default Home;
