import React, { useContext, useEffect } from "react";
import { Card, ListGroup, Form } from "react-bootstrap";
import { ThemeContext } from "styled-components";
import { PencilFill, TrashFill, Circle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const styles = {
  cardStyles: {
    display: "flex",
    flexDirection: "column",
  },
  todoItemsCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "5px 0",
    borderRadius: "0.5em",
    boxShadow: "0 3px",
    padding: '0.5em',
    height: '100%'
  },
  todoItemsContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // padding: "1em",
    width: '100%'
  },
  iconGroup: {
    width: '20%',
    display: 'flex',
    padding: '1em',
    justifyContent: 'space-around'
  },
  text: {
    margin: 0
  },
  checkboxDiv: {
    padding: '5px'
  }
};

export const ListOfTodos = ({ todo, listOfTodos, setShowEditTodo, setTodo, getTodos }) => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate()

  const deleteItem = async (todo) => {
    let itemDelete = await fetch(process.env.REACT_APP_BACKEND_URL + '/todo/' + todo._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  }

  const itemDone = async (todo) => {
    let doneItem = await fetch(process.env.REACT_APP_BACKEND_URL+'/todo/'+todo._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(
        {
          task_done: todo.task_done ? !todo.task_done : true
        }
      )
    })
    let itemDone = await doneItem.json()
    if (itemDone.status === 302) navigate('/')
    getTodos()
  }

  const handleEditClick = (e, todo) => {
    e.preventDefault()
    setTodo(todo)
    console.log(todo);
    setShowEditTodo(true)
    getTodos()

  }

  const handleDeleteClick = (e, todo) => {
    e.preventDefault()
    deleteItem(todo)
    getTodos()
  }

  const handleDone = (e, todo) => {
    itemDone(todo)
  }

  return (
    <div style={{ ...styles.cardStyles }}>
      {listOfTodos.map((todo) => {
        return (
          <Card
            key={todo._id}
            className="todo_item"
            style={{
              ...styles.todoItemsCard,
              backgroundColor: theme.palettes.deepChampagne,
            }}
          >
            <div>
              <Form.Check aria-label="checkbox-option" style={{ ...styles.checkboxDiv }} defaultChecked={todo.task_done} onClick={(e) => handleDone(e, todo)} />
            </div>
            <div style={{ ...styles.todoItemsContent }}>
              <h5 className="todo-title">{todo.name}</h5>
              {todo.due_date ? (
                <p className="date" style={{ ...styles.text }}> due on {todo.due_date?.split("T")[0]}</p>
              ) : (
                "No due date"
              )}
            </div>
            <div style={{ ...styles.iconGroup }}>
              <PencilFill size={20} onClick={(e) => handleEditClick(e, todo)} />
              <TrashFill size={20} onClick={(e) => handleDeleteClick(e, todo)} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
