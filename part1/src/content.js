import React from 'react'
import Part from './part';

const Content = (props) => (
    <>
        <Part part = {props.part1}/>
        <Part part = {props.part2}/>
        <Part part = {props.part3}/>
    </>
)

export default Content;