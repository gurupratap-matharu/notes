import React from 'react'


const Footer = () => {

    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of research and investigation, University of La Plata, Argentina 2020</em>
        </div>
    )
}

export default Footer