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
        return (
            <div style={{width: '100%'}}>
                <button id={this.props.profile._id} style={{width: '95%', fontSize: '15px', textAlign: 'left', borderColor: 'orange', borderRadius: '5px', borderWidth: '2px'}} onClick={this.onClick}>
                    Nombre: {this.props.profile.name}
                    <br/> Label: {this.props.profile.label}
                    <br/> Puesto: {this.props.profile.puesto}
                </button>
            </div>
        )
    }
}