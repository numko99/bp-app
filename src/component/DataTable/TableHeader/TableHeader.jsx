import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'

const TableHeader = ({ headers,onSorting }) => {

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("");

    // const [isShown, setIsShown] = useState(false);

    const onSortingChange=(field)=>{
        const order=field===sortingField && sortingOrder==='asc'?'desc':'asc';

        setSortingField(field);
        setSortingOrder(order);
        
        onSorting(field,order);
    }
    return (
        <thead>
            <tr>
                {headers.map(({ name, field, sortable }) =>
                (<th key={field} style={{cursor:'pointer'}}
                    // onMouseEnter={() => setIsShown(true)}  
                    // onMouseLeave={() => setIsShown(false)}
                    onClick={() => sortable ? onSortingChange(field) : null} >
                    {name}
                    {
                         sortingField && sortingField===field && (
                            sortingOrder==="asc"?<Icon.ArrowDown/>:<Icon.ArrowUp/>
                        )
                    }
                    
                    
                    </th>))}
            </tr>
        </thead>
    )
}
export default TableHeader;