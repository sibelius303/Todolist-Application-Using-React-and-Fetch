import React from "react";
import { useState, useEffect } from "react/cjs/react.development";

const URL_API = "https://assets.breatheco.de/apis/fake/todos/user"

const Home = () => {
	const [inputValue, setImputValue] = useState('');
	const [inputUser, setInputUser] = useState('');
	const [ todos , setTodos ] = useState([]);
	const [user, setUser] = useState ('');
	

	const postTodo = async (newUser) => {
		let response = await fetch (`${URL_API}/${newUser}`,{
			headers: {
				"Content-Type":"application/json"
			},
			method: "POST",
			body: JSON.stringify( [])
		})
		let data = await response.json()
		if (response.ok){
			getToDo(newUser)
		}
	}


	const putToDo = async (copia) =>{
		let response = await fetch(`${URL_API}/${user}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"PUT",
			body: JSON.stringify(copia) 
		})
		let data = await response.json()
		if (response.ok){
			getToDo(user)
		}

	}

	const getToDo = async (newUser) =>{
		let response = await fetch(`${URL_API}/${newUser}`,{
			headers:{
				"Content-Type":"application/json"
			},
			method:"GET",
		})
		let data = await response.json()
		if(response.ok){
			setTodos(data)
		} else {
			postTodo(newUser)
		}
	
		};

		const handleDeleteUser= async ()=>{
			let response = await fetch (`${URL_API}/${user}`,{
				headers:{
					"Content-Type": "application/json"
				},
				method:"DELETE"
			})
			let data = await response.json()
			if (response.status == 200){
				console.log('Eliminado exitosamente')
				setUser('');
				setTodos([]);
			}
		}
		

	// useEffect(() => {
	// getToDo()	
	// }, [])

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

	function handleEnterUser (e) {
		if (e.key == "Enter") {
			setInputUser(e.target.value)
			setUser(e.target.value)
			getToDo(e.target.value)
			setInputUser('')
		}
	}

	function handleDelete(id){
		let copia = [...todos];
		setTodos(copia.filter(num => num !== id));
		putToDo(copia.filter(num => num !== id));
	}
	
	return (
		<div className="appContainer">
			<input type="text" value={inputUser} onChange={(e)=>setInputUser(e.target.value)} onKeyDown={handleEnterUser} placeholder="Añadir Usuario"/>
			<h1 className="todoTitle">ToDo List</h1>
			<h1 className="userTitle">{user}</h1>
			<button className="buttonDelete" onClick={handleDeleteUser}>Eliminar Usuario</button>
			<div className="container">
				<div className="todoInput">
					<input type="text" placeholder="Añadir Tarea" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown}/>
					<button onClick={handleAdd}>Crear Tarea</button>
				</div>
			<div className="todoContainer">
				{
					todos.map((todo,id)=> {
						return (
							<div className="newTodo" key={id}>
								{todo.label}
								<button onClick={()=>handleDelete(todo,id)}>Eliminar</button>
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
