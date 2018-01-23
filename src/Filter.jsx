import React from 'react';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }

    search() {
        let params="?";
        let nameCheck = document.getElementById('profileNameCheckBox');
        let jobCheck = document.getElementById('profileJobCheckBox');
        let checkAccept = document.getElementById('checkAccept');
        let checkMaybe = document.getElementById('checkMaybe');
        let checkRefuse = document.getElementById('checkRefuse');

        let profileName = document.getElementById('profileName').value;
        let profileJob = document.getElementById('profileJob').value;

        params += nameCheck.checked ? 'name='+profileName+'&' : '';
        params += jobCheck.checked ? 'puesto='+profileJob+'&' : '';
        params += checkAccept.checked ? 'label=accept&' : '';
        params += checkMaybe.checked ? 'label=maybe&' : '';
        params += checkRefuse.checked ? 'label=refuse&' : '';

        this.props.search(params);

    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '25px', marginTop: '25px'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px', marginLeft: '15px'}}>
                    <input style={{marginRight: '8px', marginTop: '8px'}} type='checkbox' id='profileNameCheckBox'/>
                    <strong style={{marginRight: '4px'}}>Nombre:</strong>
                    <input type="text" id='profileName'/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px'}}>
                    <input style={{marginRight: '8px', marginTop: '8px'}} type='checkbox' id='profileJobCheckBox'/>
                    <strong style={{marginRight: '4px'}}>Puesto:</strong>
                    <input type="text" id='profileJob'/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px'}}>
                    <input style={{marginRight: '8px', marginTop: '8px'}} type='checkbox' id='checkAccept'/>
                    <strong style={{marginRight: '4px'}}>Aceptado</strong>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px'}}>
                    <input style={{marginRight: '8px', marginTop: '8px'}} type='checkbox' id='checkMaybe'/>
                    <strong style={{marginRight: '4px'}}>Quizás</strong>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px'}}>
                    <input style={{marginRight: '8px', marginTop: '8px'}} type='checkbox' id='checkRefuse'/>
                    <strong style={{marginRight: '4px'}}>Rechazado</strong>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button style={{borderRadius: '4px'}} onClick={this.search}> Buscar </button>
                </div>
            </div>
        );
    }
}