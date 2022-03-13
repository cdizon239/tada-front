import React, { useContext, useEffect } from "react";
import { Card, ListGroup, Form, ProgressBar } from "react-bootstrap";
import { ThemeContext } from "styled-components";
import './ListOfGroups.css'
import { NavLink } from 'react-router-dom';

// import { PencilFill, TrashFill, Circle } from "react-bootstrap-icons";

const styles = {
    cardStyles: {
        display: "flex",
        flexDirection: "column",
    },
    categoryCard: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "5px 0",
        borderRadius: "0.5em",
        boxShadow: "0 3px",
        padding: '0.5em',
    },
    categoryContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // padding: "1em",
        width: '100%'
    },
    progressText: {
        padding: '1em'
    },
    text: {
        margin: 0
    },
    checkboxDiv: {
        padding: '5px'
    }
};

export const ListOfGroups = ({ todos, categories }) => {
    const theme = useContext(ThemeContext);

    //   const deleteItem = async (todo) => {
    //     let itemDelete = await fetch(process.env.REACT_APP_BACKEND_URL + '/todo/' + todo._id, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //   }

    //   const handleEditClick = (e, todo) => {
    //     e.preventDefault()
    //     setTodo(todo)
    //     console.log(todo);
    //     setShowEditTodo(true)
    //     getTodos()

    //   }

    //   const handleDeleteClick = (e, todo) => {
    //     e.preventDefault()
    //     deleteItem(todo)
    //     getTodos()
    //   }

    return (
        <div style={{ ...styles.cardStyles }}>
            {categories?.map((category) => {
                let todosInCategory = todos.filter(todo => todo.category?.category_name === category.category_name).length
                let completedTodosInCategory = todos.filter(todo => todo.category?.category_name === category.category_name && todo.task_done === true).length
                let progress = (completedTodosInCategory / todosInCategory) * 100
                return (
                    <NavLink className='nav-link' to={`/tadas/${category._id}`} key={`${category._id}`}>
                        <Card
                            key={category._id}
                            className="category_item"
                            style={{
                                ...styles.categoryCard,
                                backgroundColor: theme.palettes.deepChampagne,
                            }}
                        >
                            <div style={{ ...styles.categoryContent }}>
                                <h5 className="category-title">{category.category_name} <span style={{ fontSize: "12px" }}>{completedTodosInCategory} of {todosInCategory} tasks completed</span></h5>
                                <ProgressBar now={progress} />
                            </div>
                        </Card>
                    </NavLink>
                );
            })}
        </div>
    );
};
