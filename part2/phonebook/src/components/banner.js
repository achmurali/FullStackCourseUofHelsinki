import React from 'react'

const Banner = ({banner}) => {

const bannerStyle = {
    color: banner.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

    if(banner.message == null)
        return null
    return (
        <div style = {bannerStyle} hidden = {!banner.show}>
            {banner.message}
        </div>
    )
}

export default Banner;