import React from 'react'
import { Form } from "react-bootstrap";
const Filter = ({ serviceCategories, onChangeFilter }) => {

    return (
        <Form>
        <Form.Group>
            <Form.Label>
                    <Form.Control as="select" onChange={(e) => onChangeFilter(e.target.value)} >
                        <option value='' >Choose category</option>
                        {serviceCategories.map(c => (
                            <option 
                                key={c.Id}
                                value={c.Id}>
                                {c.Name}
                            </option>
                        ))}
                    </Form.Control>
                    </Form.Label>
        </Form.Group>
        </Form>
    )
}
export default Filter;
