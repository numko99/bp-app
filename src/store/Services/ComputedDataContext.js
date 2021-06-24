import React, { createContext} from 'react'
import { createComputedDataStore } from './computedDataStore';
import { useLocalStore } from 'mobx-react';

export const ComputedDataContext = createContext();

export const ComputedDataProvider = (props) => {
    const computedDataStore= useLocalStore(createComputedDataStore);
    return (
        <ServiceContext.Provider value={computedDataStore}>
            {props.children}
        </ServiceContext.Provider>
    )
};
