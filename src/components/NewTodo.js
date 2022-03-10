import React, { useState, useContext } from "react";
import { Modal, FloatingLabel, Form } from "react-bootstrap";
import { ThemeContext } from "styled-components";


const styles = {
  modalHeader: {
    display: "flex",
    alignItems: "center",
  },
  formGroup: {
    padding: "1em",
  },
};

export const NewTodo = ({ categories, showAddTodo, setShowAddTodo, getTodos }) => {
  const theme = useContext(ThemeContext)
  const [todoName, setTodoName] = useState()
  const [todoDescription, setTodoDescription] = useState()
  const [todoDueDate, setTodoDueDate] = useState()
  const [todoCategory, setTodoCategory] = useState()
  const [errors, setErrors] = useState({})

  let formErrorCheck = () => {
    const newErrors = {}
    if (!todoName || todoName === '') newErrors.todoName = 'Todo name cannot be empty!'
    if (!todoCategory || todoCategory === ['']) newErrors.todoCategory = 'Category cannot be empty!'
    return newErrors

  }

  let createTodoItem = async (e) => {
    e.preventDefault()

    let newTodoFormErrors = formErrorCheck()

    if (Object.keys(newTodoFormErrors).length > 0) {
      setErrors(newTodoFormErrors)
    } else {
      console.log(todoName, todoDescription, todoDueDate, todoCategory);
      let createdItem = await fetch(process.env.REACT_APP_BACKEND_URL + '/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: todoName,
          description: todoDescription,
          due_date: todoDueDate,
          category_name: todoCategory,
          task_done: false
        })
      })
      getTodos()
      setShowAddTodo(false)

    }
  }


  return (
    <>
      <Modal show={showAddTodo} fullscreen={true}>
        <div className="modal-header" style={{ ...styles.modalHeader, background: theme.palettes.spaceCadet, color: theme.palettes.eggshellWhite }}>
          <p onClick={() => setShowAddTodo(false)}>Cancel</p>
          <h4> Add a new thing</h4>
          <p onClick={(e) => createTodoItem(e)}> Done </p>
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
                onChange={(e) => setTodoName(e.target.value)}
                isInvalid={!!errors.todoName}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.todoName}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Say more about this todo"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Say more about this todo"
                onChange={(e) => setTodoDescription(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="dateLabel"
              className="mb-3"
            >
              <Form.Group controlId="duedate">
                <Form.Control type="date" name="duedate" placeholder="Due date" onChange={(e) => setTodoDueDate(e.target.value)} />
              </Form.Group>
            </FloatingLabel>
            <FloatingLabel
              controlId="category"
              className="mb-3"
              label="Category"
            >
              <Form.Select aria-label="Default select example" onChange={(e) => setTodoCategory(e.target.value)} isInvalid={!!errors.todoCategory}
              >
                <option>Select a category</option>
                {categories.map((category, index) => {
                  return <option value={category} key={index}>{category}</option>
                })}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                {errors.todoCategory}
              </Form.Control.Feedback>
            </FloatingLabel>
          </div>
        </div>
      </Modal>
    </>
  );
};
