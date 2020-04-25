import React from 'react'
import Part from './part';

const Content = (props) => (
    <>
        <Part part = {props.parts[0]}/>
        <Part part = {props.parts[1]}/>
        <Part part = {props.parts[2]}/>
    </>
)

export default Content;