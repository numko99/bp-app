import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import './AddService.css'
import BaseService from '../../../../common/Api/BaseService'
import { serviceCategory } from '../../../../common/Collections'
const AddService = ({ show, onHide, onSucces }) => {

    const initialFieldValues = {
        Name: '',
        Code: '',
        Price: 0,
        Duration: 0,
        Color: '',
        isDeleted: false,
        ServiceCategoryId: 0,
        WaitingTime: false,
        WaitingTimeDuration: ''
    }

    const [values, setValues] = useState(initialFieldValues);
    const [categories, setCategories] = useState([]);



    useEffect(() => {
        let baseServiceCategory = new BaseService(serviceCategory);
        const getSetCategories = async () => {
            var categories = await baseServiceCategory.get();
            setCategories(categories);}
        getSetCategories();
    }, [])
    const handleInputChanges = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const HandleSubmit=()=>{
        onSucces({CreatedAt:Date().toLocaleString(),...values});
        
    }
    return (
        <>

            <Form>
                <Modal show={show} onHide={onHide}>
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
                                <Form.Control type="text" placeholder="Enter code" onChange={handleInputChanges} name="Code" />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter price" onChange={handleInputChanges} name="Price" />

                            </Col>
                            <Col>
                                <Form.Label>Duration</Form.Label>
                                <Form.Control type="number" placeholder="Enter duration" onChange={handleInputChanges} name="Duration" />
                            </Col>
                        </Row >
                        <Row className="mb-2">
                            <Col>
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" onChange={handleInputChanges} defaultValue="DEFAULT" name="ServiceCategoryId">
                                    <option disabled value="DEFAULT">Choose Category</option>
                                    {categories.map(s => (
                                        <option key={s.Id} value={s.Id}>{s.Name}</option>
                                    ))}
                                </Form.Control>
                            </Col>

                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Form.Label>Color</Form.Label>
                                <Form.Control type="color" onChange={handleInputChanges} name="Color" />

                            </Col>

                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={HandleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>

        </>
    );
}

export default AddService;