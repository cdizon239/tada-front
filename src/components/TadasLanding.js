import React, { useEffect, useState } from 'react'
import Header from './Header';
import { ListOfGroups } from './ListOfGroups';
import {Routes, Route} from 'react-router-dom'
import { CategoryDetail } from './CategoryDetail';

export const TadasLanding = () => {
    const [categories, setCategories] = useState()
    const [todos, setTodos] = useState()
    const [category, setCategory] = useState()

    //  fetch all categories
    const getCategories = async () => {
        let allCategories = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo/categories");
        let jsonAllCategories = await allCategories.json();
        if (jsonAllCategories) {
            setCategories(jsonAllCategories)
        }
    }
    //  fetch all todos
    const getTodos = async () => {
        let allTodos = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo");
        let jsonAllTodos = await allTodos.json();
        if (jsonAllTodos) {
            setTodos(jsonAllTodos)
        }
    };

    useEffect(() => {
        getCategories()
        getTodos()
    }, [])

    return (
        <>
            <Routes>
                <Route path="/tadas/:categoryId" element={<CategoryDetail />}></Route>
            </Routes>
            <Header title={"Tadas"} />
            {todos && categories && <ListOfGroups todos={todos} categories={categories} />}
            
        </>
    )
}
