import React, { useState } from 'react'

import Filter from './Filter/Filter'
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons'
import AddModal from './Forms/AddModal/AddModal'

import { addToastMessage } from '../../common/Toast/ToastMessages'
import { notify } from '../../common/Toast/ToastNotification'

import { ToastContainer } from 'react-toastify';
import { withRouter } from "react-router";
import { Container, Button } from 'react-bootstrap'

const DataTable = ({ context, categoryContext, children }) => {

    const [showAddModal, SetShowAddModal] = useState(false);

    const addHanlder = () => {
        SetShowAddModal(false);
        notify(addToastMessage)
    }
    const goahead=()=>{
        context.goAhead();
    }
    
    return (
        <>
            <ToastContainer />

            <AddModal show={showAddModal} onHide={() => SetShowAddModal(false)}
                onSucces={(value) => addHanlder(value)} />

            <Container>
                <div className="row w-100 mt-5">
                    <div className="col mb-3 col-12 text-center">
                        <div className="row mb-3 d-flex justify-content-end">
                            <div className="col-auto">
                                <Button variant="primary" onClick={() => SetShowAddModal(true)}>Add new service</Button>

                            </div>
                        </div>


                        <div className="row mb-3">
                            <div className="col-4">
                                <div className="col-4 d-flex flex-row">

                                    <button className="btn" onClick={context.goBack} ><ArrowLeft /></button>
                                    <button className="btn"   onClick={goahead} > <ArrowRight /></button>
                                </div>

                            </div>
                            <div className="col-4 d-flex flex-row-reverse">
                                <Filter
                                    dropDownList={categoryContext.servicesCategories}
                                    onChangeFilter={(value) => {
                                        context.setFilter(value);
                                    }}
                                />
                            </div>
                 

                        </div>


                        {children}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-4 d-flex flex-row">

                                    <button className="btn" onClick={context.goBack} ><ArrowLeft /></button>
                                    <button className="btn" onClick={context.goAhead} > <ArrowRight /></button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default withRouter(DataTable);