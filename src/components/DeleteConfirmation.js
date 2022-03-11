import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const DeleteConfirmation = ({showDeleteModal, setShowDeleteModal, deleteClickHandler}) => {
  return (
    <Modal
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={showDeleteModal}
  >
    <Modal.Header closeButton onClick={() => setShowDeleteModal(false)}>
      <Modal.Title id="contained-modal-title-vcenter">
        Are you sure?
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Do you really want to delete this list?</h4>
      <p>
        Deleting this list will also delete tasks under it if any
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={(e) => deleteClickHandler(e)}> Delete</Button>
      <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
    </Modal.Footer>
  </Modal>
    )
}
