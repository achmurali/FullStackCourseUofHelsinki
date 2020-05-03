import React from 'react';

const Filter = ({value,handleFilter}) => {
    return (
        <div>
            filter with shown : <input value = {value} onChange = {handleFilter}/>
        </div>
    )
}

export default Filter;