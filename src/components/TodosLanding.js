import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import { ThemeContext } from "styled-components";
import { ListOfTodos } from "./ListOfTodos";
import {Button} from 'react-bootstrap'
import { PlusCircleFill } from "react-bootstrap-icons";
import { NewTodo } from "./NewTodo";
import { ShowTodo } from "./ShowTodo";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";


export const TodosLanding = () => {
	const theme = useContext(ThemeContext)
	const [todos, setTodos] = useState()
  const [categories, setCategories] = useState()
  const [showAddTodo, setShowAddTodo] = useState()
  const [showEditTodo, setShowEditTodo] = useState(false)
  const [todo, setTodo] = useState()
  

  const getTodos = async () => {
    let allTodos = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo");
    let jsonAllTodos = await allTodos.json();
    if (jsonAllTodos) {
			setTodos(jsonAllTodos)
      let distinctCategories = [...new Set(jsonAllTodos.map(todo => todo.category.category_name))]
      setCategories(distinctCategories)
		}
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
		<>
			<Header title={"Todos"} />
      <div>
      {categories && <DropdownMultiselect
              options={categories}
              name="todoCategories"
            />}
        <Button style={{background:theme.palettes.tealBlue, border: 'none'}} onClick={() => setShowAddTodo(true)}>
          <PlusCircleFill className='icon'/>
        New Todo
        </Button>
        </div>
			{todos && <ListOfTodos listOfTodos={todos} setShowEditTodo={setShowEditTodo} setTodo={setTodo}/>}
      {categories && <NewTodo categories={categories} showAddTodo={showAddTodo} setShowAddTodo={setShowAddTodo} getTodos={getTodos}/>}
      {todo && <ShowTodo todo={todo} setTodo={setTodo} showEditTodo={showEditTodo} setShowEditTodo={setShowEditTodo} categories={categories} getTodos={getTodos}/>}
		</>
	)
};
