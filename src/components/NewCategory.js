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

export const NewCategory = ({ setAddCategory, addCategory, runToRender }) => {
    const [categoryName, setCategoryName] = useState()
    const [categoryColor, setCategoryColor] = useState()
    const [errors, setErrors] = useState({})
    const theme = useContext(ThemeContext)

    let formErrorCheck = () => {
        const newErrors = {}
        if (!categoryName || categoryName === '') newErrors.categoryName = 'Category name cannot be blank!'
        return newErrors
    }

    const createCategory = async (e) => {
        e.preventDefault()

        let newCategoryErrors = formErrorCheck()

        if (Object.keys(newCategoryErrors).length > 0) {
            setErrors(newCategoryErrors)
        } else {
            let createItem = await fetch(process.env.REACT_APP_BACKEND_URL + '/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category_name: categoryName,
                    color: categoryColor
                })
            })
            let createdItem = await createItem.json()
            if (createdItem) {
                console.log(createdItem);
                setAddCategory(false)
                runToRender()
            }

        }
    }
    return (
        <>
            <Modal show={addCategory} fullscreen={true}>
                <div className="modal-header" style={{ ...styles.modalHeader, background: theme.palettes.spaceCadet, color: theme.palettes.eggshellWhite }}>
                    <p onClick={() => setAddCategory(false)}>Cancel</p>
                    <h4> Add a new list</h4>
                    <p onClick={(e) => createCategory(e)}> Done </p>
                </div>
                <div className="modal-content" style={{ background: theme.background }}>
                    <div className="form-group" style={{ ...styles.formGroup }}>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="What's the name of you new list?"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="What's the name of you new list?"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setCategoryName(e.target.value)
                                }}
                                isInvalid={!!errors.categoryName}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.categoryName}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue="#563d7c"
                            title="Choose your color"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setCategoryColor(e.target.value)
                            }}
                        />
                    </div>
                </div>
            </Modal>

        </>
    )
}
