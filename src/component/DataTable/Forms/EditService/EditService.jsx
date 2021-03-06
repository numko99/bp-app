import React, { useEffect, useState } from 'react'
import { Container, Button, Form, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import BaseService from '../../../../common/Api/BaseService';
import { service,serviceCategory } from '../../../../common/Collections';
import { useContext } from 'react';
import { ServiceCategoryContext } from '../../../../store/Services/ServiceCategoryContext';

const EditService = (props) => {
    const initialFieldValues = {
        Name: '',
        Code: '',
        Price: '',
        Duration: '',
        Color: '',
        ServiceCategoryId: "DEFAULT",
        WaitingTime: false,
        WaitingTimeDuration: ""
    }
    var history = useHistory();
    let baseServiceService=new BaseService(service);

    const [values, setValues] = useState(initialFieldValues);
    const categories = useContext(ServiceCategoryContext);


    const getSetService = async () => {
        var service = await baseServiceService.getById(props.match.params.id);
        setValues(service);
    }
    const getCategories = async () => {
        categories.getServiceCategory();
    }

    useEffect(() => {
        getSetService();
        getCategories();
    }, [])

    const handleInputChanges = e => {
        let { name, value } = e.target;
        value = e.target.type === 'checkbox' ? e.target.checked : e.target.type==='number'?parseInt(value):value;

        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let object={...values};
        if (!values.WaitingTime || (values.WaitingTimeDuration==0 || values.WaitingTimeDuration.trim()==='')) {
            object={
                ...values,
                WaitingTimeDuration:"",
                WaitingTime:false
            };
        }

        baseServiceService.update(object);
        history.push("/services")
    }

    return (
        <>
            <Container>
                <Icon.ArrowLeftCircle size={30} className="mt-3" style={{cursor:'pointer'}} onClick={()=>history.goBack()}/>
                <Form className="mt-5" onSubmit={handleSubmit}>
                    <Row className="mb-2">
                        <Col md={8}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={values.Name} onChange={handleInputChanges} name="Name" />

                        </Col>
                        <Col>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter code" value={values.Code} onChange={handleInputChanges} name="Code" />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" value={values.Price} onChange={handleInputChanges} name="Price" />

                        </Col>
                        <Col>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="number" placeholder="Enter duration" value={values.Duration} onChange={handleInputChanges} name="Duration" />
                        </Col>
                    </Row >
                    <Row className="mb-2">
                        <Col>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" onChange={handleInputChanges} value={values.ServiceCategoryId} name="ServiceCategoryId">
                                <option disabled value="DEFAULT">Choose Category</option>
                                {categories.servicesCategories.map(s => (
                                    <option key={s.Id} value={s.Id}>{s.Name}</option>
                                ))}
                            </Form.Control>
                        </Col>

                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="color" onChange={handleInputChanges} value={values.Color} name="Color" />

                        </Col>

                    </Row>
                    <Row className="mb-2">
                        <Col className="mt-2">
                            <Form.Label></Form.Label>
                            <Form.Check type="checkbox" onChange={handleInputChanges} checked={values.WaitingTime} name="WaitingTime" label="Waiting time" />

                        </Col>
                        <Col>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="number" onChange={handleInputChanges} disabled={!values.WaitingTime} value={values.WaitingTimeDuration} name="WaitingTimeDuration" placeholder="Enter duration" />

                        </Col>

                    </Row>
                    <Row className="row mt-5 d-flex justify-content-end">
                        <div className="col-md-auto">
                            <Button variant="danger" className="pr-3 pl-3" onClick={handleSubmit}>Submit</Button>

                        </div>
                    </Row>
                </Form>
            </Container>
        </>
    );
}
export default EditService;