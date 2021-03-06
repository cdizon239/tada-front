import React, { useEffect, useState, useContext } from 'react'
import Header from './Header';
import { ListOfGroups } from './ListOfGroups';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { CategoryDetail } from './CategoryDetail';
import { Button } from 'react-bootstrap'
import { PlusCircleFill } from "react-bootstrap-icons";
import { ThemeContext } from 'styled-components';
import { NewCategory } from './NewCategory';


export const TadasLanding = () => {
    const [categories, setCategories] = useState()
    const [todos, setTodos] = useState()
    const [addCategory, setAddCategory] = useState(0)
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()

    //  fetch all categories
    const getCategories = async () => {
        let allCategories = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo/categories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, 
            credentials: 'include'
        });
        let jsonAllCategories = await allCategories.json();
        if (jsonAllCategories.status === 302) navigate('/')
        if (jsonAllCategories) {
            setCategories(jsonAllCategories)
        }
    }
    //  fetch all todos
    const getTodos = async () => {
        let allTodos = await fetch(process.env.REACT_APP_BACKEND_URL + "/todo", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, 
            credentials: 'include'
        });
        let jsonAllTodos = await allTodos.json();
        if (jsonAllTodos.status === 302) navigate('/')
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
            <Button style={{ background: theme.palettes.tealBlue, border: 'none', margin:'0 0 0 auto'}}  onClick={() => setAddCategory(true)}>
                <PlusCircleFill className='icon' />
                New Category
            </Button>
            {todos && categories && <ListOfGroups todos={todos} categories={categories} />}
            <NewCategory setAddCategory={setAddCategory} addCategory={addCategory} runToRender={getCategories}/>
        </>


    )
}
