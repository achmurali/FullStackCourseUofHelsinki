import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, findAllByTestId, fireEvent} from '@testing-library/react'
import BlogsForm from '../components/BlogsForm'
import { exportAllDeclaration } from 'babel-types';

test('check blog form',() => {
    const createBlog = jest.fn()
    const blogService =  jest.fn()

    const component = render(<BlogsForm createBlog = {createBlog} blogService = {blogService}/>)

    const input = component.container.querySelector('.title')
    fireEvent.change(input,{
        target: { value: 'testing of forms' } 
    })
    const button =  component.container.querySelector('.submit')
    fireEvent.click(button)
    
    expect(createBlog.mock.calls).toHaveLength(1)

})