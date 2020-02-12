import React, { Component } from 'react'

export class Publicaciones extends Component {
    render() {
        return (
            <div>
                { this.props.match.params.key }
            </div>
        )
    }
}

export default Publicaciones;
