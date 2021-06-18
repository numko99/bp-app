import React, { useState, createContext } from 'react'

export const ServicesSortingContext = createContext();

export const ServicesSortingProvider = (props) => {
    const [sorting, setSorting] = useState({ field: "", order: "",type:""});
    
    return (
        <ServicesSortingContext.Provider value={[sorting, setSorting]}>
            {props.children}
        </ServicesSortingContext.Provider>
    )
};
