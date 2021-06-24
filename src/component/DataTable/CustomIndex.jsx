import React, { useState, useEffect, useMemo } from 'react'

import TableHeader from './TableHeader/TableHeader'
import Filter from './Filter/Filter'

import AddService from './Forms/AddService/AddService'
import Confirmation from '../Modal/Confirmation/Confirmation'

import BaseService from '../../common/Api/BaseService'
import { service, serviceCategory } from '../../common/Collections'
import { addToastMessage, deleteToastMessage } from '../../common/Toast/ToastMessages'
import { notify } from '../../common/Toast/ToastNotification'

import { ToastContainer } from 'react-toastify';
import { PencilSquare, Trash, ArrowLeft, ArrowRight } from 'react-bootstrap-icons'
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom'
import { Container, Button, Table } from 'react-bootstrap'
import CustomServicesService from '../../common/Api/CusomServicesService'

const DataTable = () => {

    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);

    const ITEMS_PER_PAGE = 5;

    const [customServiceCategoryFilter, setCustomServiceCategoryFilter] = useState('');

    const [customSorting, setCustomSorting] = useState({ field: 'CreatedAt', order: 'asc' });

    const [showAddServiceModal, SetShowAddServiceModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deleteServiceId, setDeleteServiceId] = useState(0);
    const [backDisableButton, setBackDisableButton] = useState(false);
    const [nextDisableButton, setNextDisableButton] = useState(false);


    const history = useHistory();

    let baseServiceCategory = new BaseService(serviceCategory);
    let customServicesService = new CustomServicesService(service);


    const headers = [
        { name: 'Name', field: 'Name', sortable: true, type: "text" },
        { name: 'Code', field: 'Code', sortable: false, type: "text" },
        { name: 'Price', field: 'Price', sortable: true, type: "number" },
        { name: 'Duration', field: 'Duration', sortable: true, type: "number" },
        { name: 'Action', field: 'Action', sortable: false },]

    useEffect(() => {
   
        var getDataa = async () => {
            getSetCategories();
            getCustomServices();
        }
        getDataa();
    }, [customServiceCategoryFilter, customSorting])

    // getting data from firestore---------------------
    const getSetCategories = async () => {
        var categories = await baseServiceCategory.get();
        setCategories(categories);

    }
    const getCustomServices = async () => {
        var servi = await customServicesService.CustomGet(customSorting, ITEMS_PER_PAGE, customServiceCategoryFilter);
        setServices(servi);
    }
    // getting data from firestore---------------------

    // buttons-------------------------

    const goAhead = async () => {
        var servi = await customServicesService.goAheadPaging(services, customSorting, ITEMS_PER_PAGE, customServiceCategoryFilter);
        setServices(servi);
        setBackDisableButton(false);
    }
    const goBack = async () => {

        var servi = await customServicesService.goBackPaging(services, customSorting, ITEMS_PER_PAGE, customServiceCategoryFilter);
        setServices(servi);
        setNextDisableButton(false);

    }
    // buttons-------------------------
    // handlers-------------------------

    const deleteHanlder = (id) => {
        customServicesService.delete(id)
        setShowConfirmationModal(false);
        notify(deleteToastMessage);
        getCustomServices();
    }
    const addHanlder = (value) => {

        customServicesService.add(value);
        SetShowAddServiceModal(false);
        notify(addToastMessage)
        getCustomServices();

    }
    //handlers-------------------------
    const disableBackButton = async () => {
        var temp = await customServicesService.getPreviousCount(services, customSorting, ITEMS_PER_PAGE, customServiceCategoryFilter);
        if (temp === 0) {
            setBackDisableButton(true);
        }
    }
    disableBackButton();

    const disableNextButton = async () => {
        var temp = await customServicesService.getNextCount(services, customSorting, ITEMS_PER_PAGE, customServiceCategoryFilter);
        if (temp === 0) {
            setNextDisableButton(true);
        }
    }
    disableNextButton();
    return (
        <>
            <ToastContainer />
            <Confirmation show={showConfirmationModal}
                onHide={() => setShowConfirmationModal(false)}
                onSubmit={() =>
                    deleteHanlder(deleteServiceId)} />

            <AddService show={showAddServiceModal} onHide={() => SetShowAddServiceModal(false)}
                onSucces={(value) => addHanlder({ CreatedAt: Date().toLocaleString(), ...value })} />

            <Container>


                <div className="row w-100 mt-5">
                    <div className="col mb-3 col-12 text-center">
                        <div className="row mb-3 d-flex justify-content-end">

                        </div>


                        <div className="row mb-3">
                            <div className="col-4 d-flex flex-row">

                                <button className="btn" onClick={goBack} disabled={backDisableButton}><ArrowLeft /></button>
                                <button className="btn" onClick={goAhead} disabled={nextDisableButton}> <ArrowRight /></button>
                            </div>

                            <div className="col-4 d-flex">
                                <Filter
                                    dropDownList={categories}
                                    onChangeFilter={(value) => {
                                        setCustomServiceCategoryFilter(value)
                                    }}
                                />
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <div className="col-auto">
                                    <Button variant="primary" onClick={() => SetShowAddServiceModal(true)}>Add new service</Button>

                                </div>
                            </div>

                        </div>
                        <table className="table">
                            <TableHeader headers={headers} onSorting={(field, order, type) => {
                                setCustomSorting({ field, order, type })
                            }} />
                            <tbody>
                                {services.map((service) => (

                                    <tr key={service.Id}>
                                        <td>{service.Name}</td>
                                        <td>{service.Code}</td>
                                        <td>{service.Price}</td>
                                        <td>{service.Duration}</td>
                                        <td>
                                            <a className="btn text-primary">
                                                <i onClick={() => history.push("/EditService/" + service.Id)}><PencilSquare /></i>
                                            </a>
                                            <a className="btn text-danger"><i onClick={() => {
                                                setShowConfirmationModal(true)
                                                setDeleteServiceId(service.Id)
                                            }}><Trash /></i></a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="row mb-3">
                            <div className="col-4 d-flex flex-row">
                                <button className="btn" onClick={goBack} disabled={backDisableButton}><ArrowLeft /></button>
                                <button className="btn" onClick={goAhead} disabled={nextDisableButton}> <ArrowRight /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default withRouter(DataTable);