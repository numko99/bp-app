import React, { useState,useEffect } from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import './AddService.css'
import getData from '../../../../common/Api/getData'

const AddService = ({show,onHide,onSucces}) => {

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
        isDeleted:false,
        ServiceCategoryId:0,
        WaitingTime: false,
        WaitingTimeDuration: ''
}
    const [values,setValues]=useState(initialFieldValues);
    const [categories,setCategories]=useState([]);

    const getSetCategories = async () => {
        var categories = await getData("ServiceCategories");
        setCategories(categories);
    }

    useEffect(()=>{
        getSetCategories();
    },[])
    const handleInputChanges=e=>{
        const {name,value}=e.target;
        setValues({
            ...values,
            [name]:value
        })
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
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" onChange={handleInputChanges} defaultValue="DEFAULT" name="ServiceCategoryId">
                                    <option disabled value="DEFAULT">Choose Category</option>
                                    {categories.map(s=>(
                                        <option key={s.Id} value={s.Id}>{s.Name}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                           
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Form.Label>Color</Form.Label>
                                <Form.Control type="color"  onChange={handleInputChanges}  name="Color"/>

                            </Col>
                           
                        </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
            </Button>
                    <Button variant="primary"onClick={()=>onSucces(values)}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
            </Form>

        </>
    );
}

export default AddService;