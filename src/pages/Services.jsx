import React, { useContext, useEffect, useState } from 'react'
import DataTable from '../component/DataTable/DataTable';
import { ServiceContext } from '../store/Services/ServicesContext2'
import { ServiceCategoryContext } from '../store/Services/ServiceCategoryContext'
import ServiceTable from '../component/DataTable/Table/ServiceTable';
import BaseService from '../common/Api/BaseService';
import { serviceCategory } from '../common/Collections';
const Services = () => {
    const services = useContext(ServiceContext);
    const serviceCategories = useContext(ServiceCategoryContext);
    // const [serviceCategories,setServiceCategories] = useState([]);


    const Context=new BaseService(serviceCategory);
    const getServices = async () => {
        await services.getService();
    }
    const getServiceCategories = async () => {
        // console.log("getServicesss");
        await serviceCategories.getServiceCategory();
        // var list=await Context.get();
        // setServiceCategories(list);
    }
    useEffect(async () => {
       
        getServices();
        getServiceCategories();
    }, [])
 
    const headers = [
        { name: 'Name', field: 'Name', sortable: true, type: "text" },
        { name: 'Code', field: 'Code', sortable: false, type: "text" },
        { name: 'Price', field: 'Price', sortable: true, type: "number" },
        { name: 'Duration', field: 'Duration', sortable: true, type: "number" },
        { name: 'Action', field: 'Action', sortable: false },]


    const table = (<ServiceTable
        headers={headers}
        servicesContext={services} />)
    return (
        <div>

            <DataTable context={services} categoryContext={serviceCategories}>
                {table}
            </DataTable>
        </div>
    )
}
export default Services;