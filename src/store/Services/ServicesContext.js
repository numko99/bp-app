import React, { useState, createContext, useEffect, useMemo } from 'react'
import BaseService from '../../common/Api/BaseService';
import { service } from '../../common/Collections';

import { useLocalStore } from 'mobx-react';

export const ServiceContext = createContext();

export const ServiceProvider = props => {
    let baseServiceService = new BaseService(service);
    // const store=useLocalStore(()=>({
    //     services:[],
    //     totalItems:0,
    //     currentPage:1,
    //     sorting : { field: "", order: "", type: "" },
    //     ITEMS_PER_PAGE:5,

    //     search:"",
    //     filter:"",
    //     addService:addService,
    //     deleteService:deleteService
    // }));
    const [services, setServices] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sorting, setSorting] = useState({ field: "", order: "", type: "" });
    const ITEMS_PER_PAGE = 5;

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        getSetServices();
    }, [])

    const mainListData = useMemo(() => {

        let computedMainList = services.filter(x => (x.Name.toLowerCase().includes(search.toLowerCase()) &&
            (filter === "" || (x.ServiceCategoryId === filter))));

        if (sorting.field) {
            const reversed = sorting.order === 'asc' ? 1 : -1;
            computedMainList = computedMainList.sort((a, b) =>
                sorting.type == 'number' ? reversed * (a[sorting.field] - b[sorting.field]) : reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        setTotalItems(computedMainList.length);
        return computedMainList.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
    }, [services, currentPage, search, sorting, filter])

    const getSetServices = async () => {
        var service = await baseServiceService.get();
        service.sort((a, b) => {
            return new Date(b.CreatedAt) - new Date(a.CreatedAt);
        });
        setServices(service);
    }

    const addService = (values) => {
        baseServiceService.add({ CreatedAt: Date().toLocaleString(), ...values });
        getSetServices();
    }
    const deleteService = (id) => {
        baseServiceService.delete(id);
        getSetServices();
    }

    return (
        <ServiceContext.Provider value=
            {{
                totalItems: [totalItems, setTotalItems],
                currentPage: [currentPage, setCurrentPage],
                itemsPerPage: ITEMS_PER_PAGE,
                search: [search, setSearch],
                filter: [filter, setFilter],
                sorting: [sorting, setSorting],
                services: mainListData,
                add: addService,
                delete: deleteService
            }}>
            {props.children}
        </ServiceContext.Provider>
    )
};
