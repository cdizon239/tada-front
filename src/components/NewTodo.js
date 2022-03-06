import React from "react";
import { Modal, FloatingLabel, Form } from "react-bootstrap";

const styles = {
  modalHeader: {
    display: "flex",
    alignItems: "center",
  },
  formGroup: {
    padding: "1em",
  },
};

export const NewTodo = ({ showAddTodo, setShowAddTodo }) => {
  return (
    <>
      <Modal show={showAddTodo} fullscreen={true}>
        <div className="modal-header" style={{ ...styles.modalHeader }}>
          <p onClick={() => setShowAddTodo(false)}>Cancel</p>
          <h4> Add a new thing</h4>
          <p onClick={() => setShowAddTodo(false)}> Done </p>
        </div>
        <div className="modal-content">
          <div className="form-group" style={{ ...styles.formGroup }}>
            <FloatingLabel
              controlId="floatingTextarea"
              label="What would you like to do?"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="What would you like to do?"
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
              />
            </FloatingLabel>
            <Form.Group controlId="duedate">
              <Form.Control type="date" name="duedate" placeholder="Due date" />
            </Form.Group>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
        </div>
      </Modal>
    </>
  );
};
