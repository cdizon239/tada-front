import React from 'react'
import {Modal} from 'react-bootstrap'

export const ModalUp = (props, showModal, setShowModal) => {
  return (
    <Modal show={showModal} fullscreen={true} onHide={() => setShowModal(false)}>
        {props.children}
    </Modal>
  )
}
