import React, { useContext, useState } from 'react'
import { Modal, FloatingLabel, Form, Button } from "react-bootstrap";
import { ThemeContext } from "styled-components";
import { PlusCircleFill } from "react-bootstrap-icons";
import { NewCategory } from "./NewCategory";

const styles = {
    modalHeader: {
        display: "flex",
        alignItems: "center",
    },
    formGroup: {
        padding: "1em",
    },
};

export const ShowTodo = ({ todo, setTodo, showEditTodo, setShowEditTodo, categories, getTodos, getCategories }) => {
    const theme = useContext(ThemeContext)
    const [todoName, setTodoName] = useState(todo.name || '')
    const [todoDescription, setTodoDescription] = useState(todo.description || '')
    const [todoDueDate, setTodoDueDate] = useState(todo.due_date?.split('T')[0] || '')
    const [todoCategory, setTodoCategory] = useState(todo.category.category_name || '')
    const [addCategory, setAddCategory] = useState()

    const editTodoItem = async (e) => {
        e.preventDefault()
        let editItem = await fetch(process.env.REACT_APP_BACKEND_URL + '/todo/' + todo._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name: todoName,
                description: todoDescription,
                due_date: todoDueDate,
                category_name: todoCategory
            })
        })
        let editedItem = await editItem.json()
        console.log(editedItem);
        getTodos()
        setTodo(null)
        setShowEditTodo(false)
    }

    return (
        <>
            <Modal show={showEditTodo} fullscreen={true}>
                <div className="modal-header" style={{ ...styles.modalHeader, background: theme.palettes.spaceCadet, color: theme.palettes.eggshellWhite }}>
                    <p onClick={() => {
                        setTodo(null)
                        setShowEditTodo(false)

                    }}>Cancel</p>
                    <h4> Edit Todo Item</h4>
                    <p onClick={(e) => editTodoItem(e)}> Done </p>
                </div>
                <div className="modal-content" style={{ background: theme.background }}>
                    <div className="form-group" style={{ ...styles.formGroup }}>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="What would you like to do?"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="What would you like to do?"
                                value={todoName}
                                onChange={(e) => setTodoName(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Say more about this todo"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="Say more about this todo"
                                value={todoDescription}
                                onChange={(e) => setTodoDescription(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="dateLabel"
                            className="mb-3"
                        >
                            <Form.Group controlId="duedate">
                                <Form.Control type="date" name="duedate" placeholder="Due date" value={todoDueDate} onChange={(e) => setTodoDueDate(e.target.value)} />
                            </Form.Group>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="category"
                            className="mb-3"
                            label="Category"
                        >
                            <Form.Select aria-label="Default select example" value={todoCategory} onChange={(e) => setTodoCategory(e.target.value)}>
                                <option>Select a category</option>
                                {categories.map((category, index) => {
                                    return <option value={category} key={index}>{category}</option>
                                })}
                            </Form.Select>
                        </FloatingLabel>
                        <Button style={{ background: theme.palettes.tealBlue, border: 'none' }} onClick={() => setAddCategory(true)}>
                            <PlusCircleFill className='icon' />
                            Add a category
                        </Button>
                        <NewCategory setAddCategory={setAddCategory} addCategory={addCategory} runToRender={getCategories} />
                    </div>
                </div>
            </Modal>
        </>
    )
}
