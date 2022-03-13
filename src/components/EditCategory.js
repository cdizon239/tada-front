import React, { useContext, useEffect, useState } from 'react'
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

export const EditCategory = ({ category, setCategory, showEditCategory, setShowEditCategory, getCategory }) => {
    const theme = useContext(ThemeContext)
    const [categoryName, setCategoryName] = useState(category?.category_name || '')
    const [categoryColor, setCategoryColor] = useState(category?.color || '')
    const [errors, setErrors] = useState({})

    const checkFormErrors = () => {
        const newErrors = {}
        if (!categoryName || categoryName === '') newErrors.categoryName = 'Category name cannot be blank!'
        return newErrors
    }

    const editCategory = async (e) => {
        e.preventDefault()
        const formErrors = checkFormErrors()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            let editItem = await fetch(process.env.REACT_APP_BACKEND_URL + '/category/' + category._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    category_name: categoryName
                })
            })
            let editedItem = await editItem.json()
            console.log(editedItem);
            getCategory()
            setCategory(null)
            setShowEditCategory(false)

        }
    }

    useEffect(() => {
        console.log(category);
    }, [])

    return (
        <>
            <Modal show={showEditCategory} fullscreen={true}>
                <div className="modal-header" style={{ ...styles.modalHeader, background: theme.palettes.spaceCadet, color: theme.palettes.eggshellWhite }}>
                    <p onClick={() => setShowEditCategory(false)}>Cancel</p>
                    <h4> Add a new list</h4>
                    <p onClick={(e) => editCategory(e)}> Done </p>
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
                                defaultValue={category.category_name}
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
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
                            onChange={(e) => 
                                setCategoryColor(e.target.value)
                            }
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}
