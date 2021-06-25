import React, { createContext, useContext} from 'react'
import { createServiceCategoryStore } from './serviceCategoryStore';
import { useLocalStore } from 'mobx-react';

export const ServiceCategoryContext = createContext();

export const ServiceCategoryProvider = (props) => {
    const servicesCategoryStore= useLocalStore(createServiceCategoryStore);
    return (
        <ServiceCategoryContext.Provider value={servicesCategoryStore}>
            {props.children}
        </ServiceCategoryContext.Provider>
    )
};
