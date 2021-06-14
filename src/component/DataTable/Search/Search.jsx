import React  from 'react'

const Search=({changeSearch})=>{

    const onInputChange=(value)=>{
        changeSearch(value);
    }

 return (<div>
        <input type="search"
                className="form-control"
                style={{width:'240px'}}
                placeholder='Search'
                onChange={(e)=>onInputChange(e.target.value)}
                />
    </div>)
}
export default Search;