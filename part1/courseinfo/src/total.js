import React from 'react'

const Total = (props) => {

    const getSum = _  => {
        let sum = 0;
        props.parts.forEach(element => {
            sum += element.exercises;
        });
        return sum;
    }
    return (
        <p>Number of exercises {getSum()}</p>
    )
}

export default Total;