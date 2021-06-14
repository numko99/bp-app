import React  from 'react'
import { Modal, Button} from 'react-bootstrap'

const Confirmation = ({show,onSubmit,onHide}) =>  (
        <>
            <Modal  show={show} onHide={onHide}>
                <Modal.Header>
                    <Modal.Title>Are you sure you want to delete this service?</Modal.Title>
                </Modal.Header>
                        
                <Modal.Footer>
                    <Button variant="danger" onClick={onSubmit}>
                        Delete
            </Button>
                    <Button variant="secondary" onClick={onHide}>
                        Close
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

export default Confirmation;