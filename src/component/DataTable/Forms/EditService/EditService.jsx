import React, { useEffect, useState } from 'react'
import { Container, Button, Form, Col, Row } from 'react-bootstrap'
import getData from '../../../../common/Api/getData';
import getDataById from '../../../../common/Api/getDataById';
import updateData from '../../../../common/Api/updateData';
import {useHistory } from 'react-router-dom'

const EditService = (props) => {
    const initialFieldValues = {
        Name: '',
        Code: '',
        Price: 0,
        Duration: 0,
        Color: '',
        isDeleted: false,
        ServiceCategoryId: "DEFAULT",
        WaitingTime: false,
        WaitingTimeDuration: ""
    }
    var history=useHistory();
    const [values, setValues] = useState(initialFieldValues);
    const [categories, setCategories] = useState([]);

    const getSetCategories = async () => {
        var categories = await getData("ServiceCategories");
        setCategories(categories);
    }

    const getSetService = async () => {
        var service = await getDataById("Services", props.match.params.id);
        setValues(service);
    }

    useEffect(() => {
        getSetCategories();
        getSetService();
    }, [])

    const handleInputChanges = e => {
        let { name, value } = e.target;
        value = e.target.type === 'checkbox' ? !values[name] : value;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
         updateData("Services",values).catch(err=>console.log(err));
         history.push("/")
    }


    var waitingTimeDuration = null;
    if (values.WaitingTime) {
        waitingTimeDuration = (
            <Col>
                <Form.Label>Duration</Form.Label>
                <Form.Control type="number" onChange={handleInputChanges} value={values.waitingTimeDuration} name="WaitingTimeDuration" placeholder="Enter duration" />

            </Col>);
    }

    return (
        <>
            <Container>
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
                                {categories.map(s => (
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
                            <Form.Check type="checkbox" onChange={handleInputChanges} value={values.waitingTime} name="WaitingTime" label="Waiting time" />

                        </Col>
                        {waitingTimeDuration}

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