import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import { ThemeContext } from "styled-components";
import { ListOfTodos } from "./ListOfTodos";
import {Button} from 'react-bootstrap'
import { PlusCircleFill } from "react-bootstrap-icons";
import { NewTodo } from "./NewTodo";
import { ShowTodo } from "./ShowTodo";
import Select from 'react-select';


export const TodosLanding = () => {
	const theme = useContext(ThemeContext)
	const [todos, setTodos] = useState()
  const [categories, setCategories] = useState()
  const [showAddTodo, setShowAddTodo] = useState()
  const [showEditTodo, setShowEditTodo] = useState(false)
  const [todo, setTodo] = useState()
  const [selectedCategories, setSelectedCategories] = useState()

  const getCategories = async () => {
    let allCategories = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo/categories");
    let jsonAllCategories = await allCategories.json();
    if (jsonAllCategories) {
      setCategories(jsonAllCategories.map(category => category.category_name))
    }
  }

  const getTodos = async () => {
    let allTodos = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo");
    let jsonAllTodos = await allTodos.json();
    if (jsonAllTodos) {
      let sortedTodos = jsonAllTodos.sort((a,b) => new Date(a.due_date) - new Date(b.due_date))
      selectedCategories ? setTodos(sortedTodos.filter(todo => selectedCategories.includes(todo.category?.category_name) && !todo.task_done)) : setTodos(sortedTodos.filter(todo => !todo.task_done))

		}
  };

  useEffect(() => {
    getCategories();    
    getTodos();
  }, []);

  useEffect(() => {
    getTodos()
  }, [selectedCategories])

  useEffect(() => {
    console.log(todos);
  }, [todos])


  return (
		<>
			<Header title={"Todos"} />
      <div>
      {categories && <Select
              options={categories.map(category => {
                let obj = {"value": category, "label": category }
                return obj
              })}
              isMulti
              defaultValue={categories.map(category => {
                let obj = {"value": category, "label": category }
                return obj
              })}
              onChange={(categories) => {
                setSelectedCategories(categories.map(category => category.value))
              }}
            />}
        <Button style={{background:theme.palettes.tealBlue, border: 'none'}} onClick={() => setShowAddTodo(true)}>
          <PlusCircleFill className='icon'/>
        New Todo
        </Button>
        </div>
			{todos && <ListOfTodos todo={todo} listOfTodos={todos} setShowEditTodo={setShowEditTodo} setTodo={setTodo} getTodos={getTodos}/>}
      {categories && <NewTodo categories={categories} showAddTodo={showAddTodo} setShowAddTodo={setShowAddTodo} getTodos={getTodos} getCategories={getCategories}/>}
      {todo && <ShowTodo todo={todo} setTodo={setTodo} showEditTodo={showEditTodo} setShowEditTodo={setShowEditTodo} categories={categories} getTodos={getTodos} getCategories={getCategories}/>}
		</>
	)
};
