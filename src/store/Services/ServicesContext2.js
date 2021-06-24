import React, { createContext, useContext} from 'react'
import { createServiceStore } from './serviceStore';
import { useLocalStore } from 'mobx-react';

export const ServiceContext = createContext();

export const ServiceProvider = (props) => {
    const servicesStore= useLocalStore(createServiceStore);
    return (
        <ServiceContext.Provider value={servicesStore}>
            {props.children}
        </ServiceContext.Provider>
    )
};
