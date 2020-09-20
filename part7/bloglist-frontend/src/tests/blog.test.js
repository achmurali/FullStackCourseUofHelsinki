import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, findAllByTestId, fireEvent} from '@testing-library/react'
import Blog from '../components/Blog'
import { exportAllDeclaration } from 'babel-types';

test('renders only title by default',() =>  {
    const blog = {
        title: "JUSTTT TESTING",
        name:"TEST",
        author:"TEST",
        url:"TEST",
        user:{
            name:"TEST"
        }
    }

    const component = render(<Blog blog={blog}/>)

    const div = component.container.querySelector('.blog')
    const hiddenDiv = component.container.querySelector('.showWhenVisible')

    expect(hiddenDiv).toHaveStyle('display:none')
    expect(div).toHaveTextContent(
        'JUSTTT TESTING'
    )
})

test('renders details on show',() => {
    const blog = {
        title: "JUSTTT TESTING",
        name:"TEST",
        author:"TEST",
        url:"TEST",
        user:{
            name:"TEST"
        }
    }
    
    const component = render(<Blog blog={blog}/>)
    const button = component.container.querySelector('.showButton')
    fireEvent.click(button)
    const div = component.container.querySelector('.showWhenVisible')
    expect(div).not.toHaveStyle(`display:`)
})
