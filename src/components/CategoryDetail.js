import React, { useContext, useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import {Card, Form} from 'react-bootstrap'
import { ThemeContext } from 'styled-components';
import Header from './Header';

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
      width: "100%"
    },
    navLink: {
        color: "black",
        textDecoration: "none"

    }
}    



export const CategoryDetail = () => {
    const theme = useContext(ThemeContext)
    const [todos, setTodos] = useState()
    const [category, setCategory] = useState()

    let params = useParams()

    //  fetch all todos
    const getTodos = async () => {
        let allTodos = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo");
        let jsonAllTodos = await allTodos.json();
        if (jsonAllTodos) {
            let todosInCategory = jsonAllTodos.filter(todo => todo.category._id === params.categoryId)
            setTodos(todosInCategory)
        }
    };

    // fetch category
    const getCategory = async () => {
        let category = await fetch(process.env.REACT_APP_BACKEND_URL + '/category/'+params.categoryId)
        let categoryShow = await category.json();
        if (categoryShow) {
            console.log(categoryShow);
            setCategory(categoryShow)
        }
    }

    useEffect(() => {
        getTodos()
        getCategory()
    }, [])

    return (
        <>
            
            <NavLink to='/tadas' style={{...styles.navLink}}><p>{"< Back"}</p></NavLink>
            { category && <Header title={category.category_name} />}
            {todos?.map(todo => {
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
                      <Form.Check aria-label="checkbox-option" style={{ ...styles.checkboxDiv }} checked={todo.task_done} />
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
                    </div>
                  </Card>
                )
            })}
        </>
    )
}
