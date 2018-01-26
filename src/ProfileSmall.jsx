import React from 'react';

export default class ProfileSmall extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        this.props.onClick(this.props.profile);
    }

    render() {
        if (this.props.labeled) {
            return (
                <div style={{width: '100%'}}>
                    <button id={this.props.profile._id} style={{width: '95%', fontSize: '15px', textAlign: 'left', borderColor: 'orange', borderRadius: '5px', borderWidth: '2px', borderRightWidth: '3px', borderLeftWidth: '3px'}} onClick={this.onClick}>
                        Nombre: {this.props.profile.name}
                        <br/> Puesto: {this.props.profile.puesto}
                        <br/> Label: {this.props.profile.label}
                        <br/> Base de datos con etiquetado
                    </button>
                </div>
            )
        } else {
            return (
                <div style={{width: '100%'}}>
                    <button id={this.props.profile._id} style={{width: '95%', fontSize: '15px', textAlign: 'left', borderColor: 'orange', borderRadius: '5px', borderWidth: '2px', borderRightWidth: '3px', borderLeftWidth: '3px'}} onClick={this.onClick}>
                        Nombre: {this.props.profile.name}
                        <br/> Base de Datos sin etiquetado
                    </button>
                </div>
            )
        }
    }
}