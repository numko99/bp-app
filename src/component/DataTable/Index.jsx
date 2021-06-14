import React, { useState, useEffect, useMemo } from 'react'
import TableHeader from './TableHeader/TableHeader'
import Pagination from './Pagination/Pagination'
import Search from './Search/Search'
import { Container, Button } from 'react-bootstrap'
import getData from '../../common/Api/getData'
import Filter from './Filter/Filter'
import AddService from './Forms/AddService/AddService'
import addData from '../../common/Api/addData'
import deleteData from '../../common/Api/deleteData'
import Confirmation from '../Modal/Confirmation/Confirmation'
import { Redirect, Route,Switch,useHistory } from 'react-router-dom'
import { withRouter } from "react-router";
import EditService from './Forms/EditService/EditService'

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

    const history=useHistory();

    const headers = [
        { name: 'Name', field: 'Name', sortable: false },
        { name: 'Code', field: 'Code', sortable: true },
        { name: 'Price', field: 'Price', sortable: false },
        { name: 'Duration', field: 'Duration', sortable: false },
        { name: 'Action', field: 'Action', sortable: false },]

    const getSetServices = async () => {
        var services = await getData("Services");
        setServices(services);
    }
    const getSetCategories = async () => {
        var categories = await getData("ServiceCategories");
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
            console.log(services);

        console.log(serviceCategoryFilter);
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
        deleteData("Services", id);
        getSetServices();
        setShowConfirmationModal(false);
    }
    return (
        <>
            <Confirmation show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} onSubmit={() => deleteField(deleteServiceId)} />
            <AddService show={showAddServiceModal} onHide={() => SetShowAddServiceModal(false)}
                onSucces={(value) => {
                    addData("Services", value);
                    SetShowAddServiceModal(false);
                    getSetServices();
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
                        <table className="table table-striped mb-5">
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
                                                <i className="fas fa-pencil-alt" onClick={()=>history.push("/EditService/"+service.Id)}>U</i>
                                            </a>
                                            <a className="btn text-danger">
                                                <i onClick={() => {
                                                    setShowConfirmationModal(true)
                                                    setDeleteServiceId(service.Id)
                                                }}>D</i>
                                            </a>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
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
                <Switch>
            {/* <Route path={props.match.url+'/EditService/:id'} exact component={EditService} /> */}
            </Switch>
            </Container>
        </>
    )
}

export default withRouter(DataTable);