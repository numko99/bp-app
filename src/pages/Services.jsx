import React, { useContext } from 'react'

import DataTable from '../component/DataTable/DataTable';
import { ServiceContext } from '../store/Services/ServicesContext'
import { ServiceCategoryContext } from '../store/Services/ServiceCategoryContext'

const Services = () => {
    const services=  useContext(ServiceContext);
    const serviceCategories = useContext(ServiceCategoryContext);

    const headers = [
        { name: 'Name', field: 'Name', sortable: true, type: "text" },
        { name: 'Code', field: 'Code', sortable: false, type: "text" },
        { name: 'Price', field: 'Price', sortable: true, type: "number" },
        { name: 'Duration', field: 'Duration', sortable: true, type: "number" },
        { name: 'Action', field: 'Action', sortable: false },]


    return (
        <div>
     
        <DataTable headers={headers} mainList={services} filterList={serviceCategories}/>
        </div>
    )
}
export default Services;