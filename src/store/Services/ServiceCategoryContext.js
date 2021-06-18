import React, { useState, createContext, useEffect } from 'react'
import BaseService from '../../common/Api/BaseService';
import { serviceCategory } from '../../common/Collections';


export const ServiceCategoryContext = createContext();

export const ServiceCategoryProvider = props => {
    let baseServiceCategory=new BaseService(serviceCategory);
    
    const [serviceCategories, setServiceCategories] = useState([]);

    useEffect(() => {
        var getData = async () => {
            var categories = await baseServiceCategory.get();
            setServiceCategories(categories);
        }
        getData();
    }, [])

    return (
        <ServiceCategoryContext.Provider value={[serviceCategories, setServiceCategories]}>
            {props.children}
        </ServiceCategoryContext.Provider>
    )
};
