import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const CategoryDetail = () => {
    const [todos, setTodos] = useState()
    const [todoCategories, setTodoCategories] = useState()


    let params = useParams()

    // let getTodoCategories = async () => {
    //     let allTodos = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo");
    //     let jsonAllTodos = await allTodos.json();
    //     if (jsonAllTodos) {
    //         let categoryTodos = jsonAllTodos.filter(todo => todo.category.id === params.categoryId)
    //         setTodoCategories(categoryTodos)
    //     }
    // }

    //  fetch all todos
    const getTodos = async () => {
        let allTodos = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo");
        let jsonAllTodos = await allTodos.json();
        if (jsonAllTodos) {
            let todosInCategory = jsonAllTodos.filter(todo => todo.category._id === params.categoryId)
            setTodos(todosInCategory)
        }
    };

    useEffect(() => {
        getTodos()
    }, [])


    return (
        <>
            <div>CategoryDetail</div>
            {todos?.map(todo => {
                return todo.name
            })}
        </>
    )
}
