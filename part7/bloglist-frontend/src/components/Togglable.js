import React, { useState,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props,ref) => {
    const [visible,setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none':''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibilty = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return { toggleVisibilty }
    })

    return (
        <div>
        <div style = {hideWhenVisible} className = 'hideWhenVisible'>
        {props.defaultDisplay}
        <button onClick = {toggleVisibilty} className = 'showButton'>{props.buttonLabel}</button>
        </div>
        <div style = {showWhenVisible} className = 'showWhenVisible'>
            {props.children}
            <button onClick = {toggleVisibilty}>{props.hideButtonLabel ? props.hideButtonLabel : 'Cancel'} </button>
        </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel : PropTypes.string.isRequired
}

export default Togglable
