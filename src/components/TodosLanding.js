import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import { ThemeContext } from "styled-components";
import { ListOfTodos } from "./ListOfTodos";
import {Button} from 'react-bootstrap'
import { PlusCircleFill } from "react-bootstrap-icons";
import { ModalUp } from "./ModalUp";

export const TodosLanding = () => {
	const theme = useContext(ThemeContext)
	const [todos, setTodos] = useState()
  const [showModal, setShowModal] = useState()
  

  const getTodos = async () => {
    let allTodos = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo");
    let jsonAllTodos = await allTodos.json();
    if (jsonAllTodos) {
			setTodos(jsonAllTodos)
		}
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
		<>
			<Header title={"Todos"} />
      <div>
        <Button style={{background:theme.palettes.tealBlue, border: 'none'}}>
          <PlusCircleFill className='icon'/>
        New Todo
        </Button>
        </div>
			{todos && <ListOfTodos listOfTodos={todos} />}
      <ModalUp showModal={showModal} setShowModal={setShowModal}/>

		</>
	)
};
