import React, { useState, useEffect, useMemo } from 'react'

import TableHeader from './TableHeader/TableHeader'
import Pagination from './Pagination/Pagination'
import Search from './Search/Search'
import Filter from './Filter/Filter'

import AddService from './Forms/AddService/AddService'
import Confirmation from '../Modal/Confirmation/Confirmation'

import BaseService from '../../common/Api/BaseService'
import { service, serviceCategory } from '../../common/Collections'
import { addToastMessage, deleteToastMessage } from '../../common/Toast/ToastMessages'
import {notify} from '../../common/Toast/ToastNotification'

import { ToastContainer, toast } from 'react-toastify';
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom'
import { Container, Button, Table } from 'react-bootstrap'


const DataTable = (props) => {

    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    const [search, setSearch] = useState("");
    const [serviceCategoryFilter, setServiceCategoryFilter] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const [showAddServiceModal, SetShowAddServiceModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deleteServiceId, setDeleteServiceId] = useState(0);

    const history = useHistory();
    let baseServiceService = new BaseService(service);
    let baseServiceCategory = new BaseService(serviceCategory);


    const headers = [
        { name: 'Name', field: 'Name', sortable: true },
        { name: 'Code', field: 'Code', sortable: false },
        { name: 'Price', field: 'Price', sortable: true },
        { name: 'Duration', field: 'Duration', sortable: true },
        { name: 'Action', field: 'Action', sortable: false },]



    const getSetServices = async () => {
        var service = await baseServiceService.get();
        setServices(service);
    }


    const getSetCategories = async () => {
        var categories = await baseServiceCategory.get();
        setCategories(categories);
    }


    useEffect(() => {
        var getDataa = async () => {
            getSetServices();
            getSetCategories();
        }
        getDataa();
    }, [])


    const servicesData = useMemo(() => {
        let computedServices = services.filter(x => (x.Name.toLowerCase().includes(search.toLowerCase()) &&
            (serviceCategoryFilter === "" || (x.ServiceCategoryId === serviceCategoryFilter))));

        if (sorting.field) {
            const reversed = sorting.order === 'asc' ? 1 : -1;
            computedServices = computedServices.sort((a, b) =>
                reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        setTotalItems(computedServices.length);
        return computedServices.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
    }, [services, currentPage, search, sorting, serviceCategoryFilter])


    const serviceCategoryData = useMemo(() => {
        let computedServiceCategories = categories;
        return computedServiceCategories;
    }, [categories])

    const deleteField = (id) => {
        baseServiceService.delete(id)
        setShowConfirmationModal(false);
        notify(deleteToastMessage);
    }
    return (
        <>
            <ToastContainer />
            <Confirmation show={showConfirmationModal}
                onHide={() => setShowConfirmationModal(false)}
                onSubmit={() =>
                    deleteField(deleteServiceId)} />

            <AddService show={showAddServiceModal} onHide={() => SetShowAddServiceModal(false)}
                onSucces={(value) => {
                    baseServiceService.add(value);
                    SetShowAddServiceModal(false);
                    notify(addToastMessage)
                }} />

            <Container>
                <div className="row w-100 mt-5">
                    <div className="col mb-3 col-12 text-center">
                        <div className="row mb-3 d-flex justify-content-end">
                            <div className="col-md-auto">
                                <Button variant="primary" onClick={() => SetShowAddServiceModal(true)}>Add new service</Button>

                            </div>
                        </div>


                        <div className="row mb-3">
                            <div className="col-md-4">
                                <Pagination
                                    total={totalItems}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    currentPage={currentPage}
                                    onPageChange={page => setCurrentPage(page)} />

                            </div>
                            <div className="col-md-4 d-flex flex-row-reverse">
                                <Filter
                                    serviceCategories={serviceCategoryData}
                                    onChangeFilter={(value) =>
                                        setServiceCategoryFilter(value)} />
                            </div>
                            <div className="col-md-4 d-flex flex-row-reverse">
                                <Search
                                    changeSearch={(value) => {
                                        setSearch(value)
                                        setCurrentPage(1)
                                    }} />
                            </div>

                        </div>
                        <Table>
                            <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
                            <tbody>
                                {servicesData.map((service) => (

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
                        </Table>
                        <div className="row">
                            <div className="col-md-6">
                                <Pagination
                                    total={totalItems}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    currentPage={currentPage}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default withRouter(DataTable);