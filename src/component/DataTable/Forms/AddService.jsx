import React, { useState } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import {useInput} from '../../../common/hooks/useInput'
import firebase from '../../../common/firebase'
import './AddService.css'

const AddService = ({UpdateData}) => {
    const ref = firebase.firestore().collection("Services");


    const [show, setShow] = useState(false);

    // const { value:Name, bind:bindName, reset:resetName } = useInput('');
    // const { value:Code, bind:bindCode, reset:resetCode } = useInput('');
    // const { value:Price, bind:bindPrice, reset:resetPrice } = useInput('');
    // const { value:Duration, bind:bindDuration, reset:resetDuration } = useInput('');
    // const { value:Color, bind:bindColor, reset:resetColor } = useInput('');
    
    const initialFieldValues={
        Name:'',
        Code:'',
        Price:0,
        Duration:0,
        Color:'',
        isDeleted:false
}
    const [values,setValues]=useState(initialFieldValues);

    const handleInputChanges=e=>{
        const {name,value}=e.target;
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit=()=>{
        ref.add(values)
        UpdateData();
        handleClose();
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add new service
        </Button>
        <Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Services</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Row className="mb-2">
                            <Col md={8}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" onChange={handleInputChanges} name="Name" />

                            </Col>
                            <Col>
                                <Form.Label>Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter code"  onChange={handleInputChanges}  name="Code"/>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number"  placeholder="Enter price" onChange={handleInputChanges}  name="Price"/>

                            </Col>
                            <Col>
                                <Form.Label>Duration</Form.Label>
                                <Form.Control type="number" placeholder="Enter duration" onChange={handleInputChanges}  name="Duration"/>
                            </Col>
                        </Row >
                        <Row className="mb-2">
                            <Col>
                                <Form.Label>Color</Form.Label>
                                <Form.Control type="color"  onChange={handleInputChanges}  name="Color"/>

                            </Col>
                           
                        </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary"onClick={handleSubmit}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
            </Form>

        </>
    );
}

export default AddService;