import React, { useContext, useEffect, useState } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import {Card, Form} from 'react-bootstrap'
import { ThemeContext } from 'styled-components';
import Header from './Header';
import { PencilFill, TrashFill, Circle } from "react-bootstrap-icons";
import { EditCategory } from './EditCategory';
import { DeleteConfirmation } from './DeleteConfirmation';


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
    const navigate = useNavigate()
    const theme = useContext(ThemeContext)
    const [todos, setTodos] = useState()
    const [category, setCategory] = useState()
    const [showEditCategory, setShowEditCategory] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState()

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

    const deleteClickHandler = async (e) => {
        e.preventDefault()
        let deleteCategory = await fetch( process.env.REACT_APP_BACKEND_URL + '/category/'+params.categoryId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let deletedCategory = await deleteCategory.json()
        if (deletedCategory) {
            setShowDeleteModal(false)
            navigate('/tadas')
        }
    }

    useEffect(() => {
        getTodos()
        getCategory()
    }, [])

    return (
        <>
        {category && (
            <>
            <NavLink to='/tadas' style={{...styles.navLink}}><p>{"< Back"}</p></NavLink>
            <Header title={category.category_name} />
            <PencilFill size={20} onClick={(e) => setShowEditCategory(true)} />
            <TrashFill size={20} onClick={() => setShowDeleteModal(true)}/>
            <EditCategory category={category} setCategory={setCategory} showEditCategory={showEditCategory} setShowEditCategory={setShowEditCategory} getCategory={getCategory} />
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
                  </Card>
                )
            })}
            <DeleteConfirmation showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} deleteClickHandler={deleteClickHandler}/>
            </>
        )
        }
        </>
    )
}
