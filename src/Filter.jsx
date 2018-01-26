import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.togglePuesto = this.togglePuesto.bind(this);
        this.toggleLabel = this.toggleLabel.bind(this);
        this.toggleDB = this.toggleDB.bind(this);
        this.selectPuesto = this.selectPuesto.bind(this);
        this.selectLabel = this.selectLabel.bind(this);
        this.selectDB = this.selectDB.bind(this);
        this.state={
            dropdownLabelOpen: false,
            dropdownPuestoOpen: false,
            dropdownDBOpen: false,
            puestoSelected: "",
            labelSelected: "",
            dBSelected: "",
        }
    }

    togglePuesto() {
        document.getElementById('profileJobCheckBox').checked = true;
        this.setState({
            dropdownPuestoOpen: !this.state.dropdownPuestoOpen,
        });
    }

    selectPuesto(event) {
        this.setState({
            dropdownPuestoOpen: !this.state.dropdownPuestoOpen,
            puestoSelected: event.target.innerText,
        });
    }

    toggleLabel() {
        document.getElementById('checkLabel').checked = true;
        this.setState({
            dropdownLabelOpen: !this.state.dropdownLabelOpen,
        });
    }

    selectLabel(event) {
        this.setState({
            dropdownLabelOpen: !this.state.dropdownLabelOpen,
            labelSelected: event.target.innerText,
        });
    }

    toggleDB() {
        document.getElementById('checkDB').checked = true;
        this.setState({
            dropdownDBOpen: !this.state.dropdownDBOpen,
        });
    }

    selectDB(event) {
        if (event.target.innerText === "Sin etiquetado") {
            document.getElementById('checkLabel').checked = false;
            document.getElementById('checkLabel').disabled = true;
            document.getElementById('profileJobCheckBox').checked = false;
            document.getElementById('profileJobCheckBox').disabled = true;
        } else {
            document.getElementById('checkLabel').disabled = false;
            document.getElementById('profileJobCheckBox').disabled = false;
        }
        this.setState({
            dropdownDBOpen: !this.state.dropdownDBOpen,
            dBSelected: event.target.innerText,
        });
    }

    search() {
        let params="?";
        let nameCheck = document.getElementById('profileNameCheckBox');
        let jobCheck = document.getElementById('profileJobCheckBox');
        let checkLabel = document.getElementById('checkLabel');
        let checkDB = document.getElementById('checkDB');

        let url = "https://34.248.142.102/api-linkedin/v1/profiles";
        let labeled = (this.state.dBSelected === "Con etiquetado");

        if (checkDB.checked) {
            url = this.state.dBSelected === "Sin etiquetado" ? "https://34.248.142.102/api-linkedin/v1/unlabeledProfiles" : "https://34.248.142.102/api-linkedin/v1/profiles";
        }

        let profileName = document.getElementById('profileName').value;

        params += nameCheck.checked ? 'name='+profileName+'&' : '';
        params += jobCheck.checked ? 'puesto='+this.state.puestoSelected+'&' : '';
        let realLabel;
        switch(this.state.labelSelected) {
            case "Aceptado":
                realLabel = "accept";
                break;
            case "Quizás":
                realLabel = "maybe";
                break;
            case "Rechazado":
                realLabel = "refuse";
                break;
        }
        if (labeled) {
            params += checkLabel.checked ? 'label='+realLabel+'&' : '';
        }
        url += params;
        this.props.search(url, this.props.page, labeled);

    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', marginBottom: '25px', marginTop: '25px'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px', marginLeft: '15px'}}>
                    <input style={{marginRight: '8px', marginTop: '14px'}} type='checkbox' id='profileNameCheckBox'/>
                    <strong style={{marginRight: '4px', marginTop: '8px'}}>Nombre </strong>
                    <input type="text" id='profileName'/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px'}}>
                    <input style={{marginRight: '8px', marginTop: '14px'}} type='checkbox' id='profileJobCheckBox'/>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <strong style={{marginRight: '3.5%', marginTop: '8px'}}>Puesto </strong>
                        <Dropdown isOpen={this.state.dropdownPuestoOpen} toggle={this.togglePuesto}>
                            <DropdownToggle caret>
                                {this.state.puestoSelected === "" ? "Eliga un puesto" : this.state.puestoSelected}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.selectPuesto}>Enterprise Architect</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Arquitecto de Software</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Arquitecto de Sistemas</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Front-End</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Back-End</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>DevOps Engineer</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Mobile (iOS/Android) Engineer</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Tester/QA Analyst</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Data Architect</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Data Scientist</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Ingeniero QA</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Arquitecto de Big Data</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Ingeniero de Big Data</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Experto IoT</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Arquitecto Cloud</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Maquetador</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>UX Designer</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Agile Coach</DropdownItem>
                                <DropdownItem onClick={this.selectPuesto}>Scrum Master</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>        
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px'}}>
                    <input style={{marginRight: '8px', marginTop: '14px'}} type='checkbox' id='checkLabel'/>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <strong style={{marginRight: '3.5%', marginTop: '8px'}}>Label</strong>
                        <Dropdown isOpen={this.state.dropdownLabelOpen} toggle={this.toggleLabel}>
                            <DropdownToggle caret>
                                {this.state.labelSelected === "" ? "Eliga un label" : this.state.labelSelected}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.selectLabel}>Aceptado</DropdownItem>
                                <DropdownItem onClick={this.selectLabel}>Quizás</DropdownItem>
                                <DropdownItem onClick={this.selectLabel}>Rechazado</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '30px'}}>
                    <input style={{marginRight: '8px', marginTop: '14px'}} type='checkbox' id='checkDB'/>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <strong style={{marginRight: '3.5%', marginTop: '8px'}}>BB.DD. </strong>
                        <Dropdown isOpen={this.state.dropdownDBOpen} toggle={this.toggleDB}>
                            <DropdownToggle caret>
                                {this.state.dBSelected === "" ? "Eliga una base de datos" : this.state.dBSelected}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.selectDB}>Con etiquetado</DropdownItem>
                                <DropdownItem onClick={this.selectDB}>Sin etiquetado</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button style={{borderRadius: '4px'}} onClick={this.search}> Buscar </button>
                </div>
            </div>
        );
    }
}