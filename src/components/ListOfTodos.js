import React, { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import "./ListOfTodos.css";
import { ThemeContext } from "styled-components";
import { PencilFill, TrashFill } from "react-bootstrap-icons";

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
  }
};

export const ListOfTodos = ({ listOfTodos, setShowEditTodo, setTodo }) => {
  const theme = useContext(ThemeContext);

  const handleEditClick = (e,todo) => {
    e.preventDefault()
    console.log(todo);
    setTodo(todo)
    setShowEditTodo(true)

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
              backgroundColor: theme.palettes.mandarin,
            }}
          >
            <div style={{ ...styles.todoItemsContent }}>
              <h5 className="todo-title">{todo.name}</h5>
              {todo.due_date ? (
                <p className="date" style={{...styles.text}}> due on {todo.due_date?.split("T")[0]}</p>
              ) : (
                "No due date"
              )}
            </div>
            <div style={{...styles.iconGroup}}>
              <PencilFill size={20} onClick={(e) => handleEditClick(e,todo)}/>
              <TrashFill size={20}  />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
