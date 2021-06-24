import React, { useState, useMemo } from 'react'

import Pagination from './Pagination/Pagination'
import Search from './Search/Search'
import Filter from './Filter/Filter'

import AddModal from './Forms/AddModal/AddModal'

import { addToastMessage } from '../../common/Toast/ToastMessages'
import { notify } from '../../common/Toast/ToastNotification'

import { ToastContainer } from 'react-toastify';
import { withRouter } from "react-router";
import { Container, Button } from 'react-bootstrap'
import ServiceTable from './Table/ServiceTable'

const DataTable = ({ headers, mainList, filterList }) => {

    const [showAddModal, SetShowAddModal] = useState(false);
    const addHanlder = () => {
        SetShowAddModal(false);
        notify(addToastMessage)
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


                        {/* <div className="row mb-3">
                            <div className="col-4">
                                <Pagination
                                    total={mainList.totalItems[0]}
                                    itemsPerPage={mainList.itemsPerPage}
                                    currentPage={mainList.currentPage[0]}
                                    onPageChange={page => {
                                        mainList.currentPage[1](page)
                                    }
                                    } />

                            </div>
                            <div className="col-4 d-flex flex-row-reverse">
                                <Filter
                                    dropDownList={filterList[0]}
                                    onChangeFilter={(value) => {
                                        mainList.filter[1](value)
                                        mainList.currentPage[1](1)
                                    }}
                                />
                            </div>
                            <div className="col-4 d-flex flex-row-reverse">
                                <Search
                                    changeSearch={(value) => {
                                        mainList.search[1](value)
                                        mainList.currentPage[1](1)
                                    }} />
                            </div> 

                        </div>
                        */}
                        <ServiceTable
                            headers={headers} />
                        <div className="row">
                            {/* <div className="col-md-6">
                                <Pagination
                                    total={mainList.totalItems[0]}
                                    itemsPerPage={mainList.itemsPerPage}
                                    currentPage={mainList.currentPage[0]}
                                    onPageChange={page => {
                                        mainList.currentPage[1](page)
                                    }
                                    } />

                            </div> */}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default withRouter(DataTable);