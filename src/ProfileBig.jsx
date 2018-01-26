import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class ProfileBig extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.toggleLabel = this.toggleLabel.bind(this);
        this.togglePuesto = this.togglePuesto.bind(this);
        this.selectPuesto = this.selectPuesto.bind(this);
        this.selectLabel = this.selectLabel.bind(this);
        this.state = {
            dropdownLabelOpen: false,
            dropdownPuestoOpen: false,
            puestoSelected: "",
            labelSelected: "",
        }
    }

    selectPuesto(event) {
        this.setState({
            dropdownPuestoOpen: !this.state.dropdownPuestoOpen,
            puestoSelected: event.target.innerText,
        });
    }

    selectLabel(event) {
        this.setState({
            dropdownLabelOpen: this.state.dropdownLabelOpen,
            labelSelected: event.target.innerText,
        });
    }

    toggleLabel() {
        this.setState({
            dropdownLabelOpen: !this.state.dropdownLabelOpen,
        });
    }

    togglePuesto() {
        this.setState({
            dropdownPuestoOpen: !this.state.dropdownPuestoOpen,
        });
    }

    delete () {
        if (this.props.labeled) {
            this.props.delete(this.props.profile._id, this.props.labeled);
        } else {
            this.props.delete(this.props.profile.searchId, this.props.labeled);
        }
    }

    edit() {
        this.props.edit();
    }

    saveEdit() {
        let profile = this.props.profile;
        let realLabel;
        switch(this.state.labelSelected) {
            case "Aceptado":
                realLabel = 'accept';
                break;
            case "Quizás":
                realLabel = 'maybe';
                break;
            case "Rechazado":
                realLabel = 'refuse';
                break;
        }
        profile.label = this.state.labelSelected === "" ? this.props.profile.label : realLabel;
        profile.puesto = this.state.puestoSelected === "" ? this.props.profile.puesto : this.state.puestoSelected;
        let comment = document.getElementById('comment').value;
        console.log(comment);
        profile.comment = '"'+comment+'"';
        this.props.saveEdit(profile);
    }

    cancelEdit() {
        this.props.cancelEdit();
    }

    render() {
        if (this.props.profile === "") {
            return (
                <div style={{width: '100%'}}>
                </div>
            )
        } else {
            if (this.props.editEnabled) {
                return (
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: '2.8%', borderStyle: 'solid', borderColor: 'orange', borderRadius: '5px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '2%', width: '65%', fontFamily: 'Sans-serif'}}>
                            <div ><br/><strong>Nombre </strong>{this.props.profile.name}</div>
                            <br/>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <strong style={{marginRight: '1%'}}>Puesto </strong>
                                <Dropdown isOpen={this.state.dropdownPuestoOpen} toggle={this.togglePuesto}>
                                    <DropdownToggle caret>
                                        {this.state.puestoSelected === "" ? this.props.profile.puesto : this.state.puestoSelected}
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
                            <br/>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <strong style={{marginRight: '1%'}}>Label </strong>
                                <Dropdown isOpen={this.state.dropdownLabelOpen} toggle={this.toggleLabel}>
                                    <DropdownToggle caret>
                                        {this.state.labelSelected === "" ? this.props.profile.label : this.state.labelSelected}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={this.selectLabel}>Aceptado</DropdownItem>
                                        <DropdownItem onClick={this.selectLabel}>Quizás</DropdownItem>
                                        <DropdownItem onClick={this.selectLabel}>Rechazado</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div><br/><strong>Comentario </strong><input type='tetx' defaultValue={this.props.profile.comment} id="comment"/></div>
                            <div><br/><strong>Identificador B.D. </strong>{this.props.profile._id}</div>
                            <div><br/><strong>Identificador linkedIn </strong>{this.props.profile.linkedinId}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', width: '32%'}}>
                            <br/>
                            <button style={{height: '5%', width: '70%', borderRadius: '5px', fontSize: '14px'}} onClick={this.saveEdit}>Guardar</button>
                            <br/>
                            <button style={{height: '5%', width: '70%', borderRadius: '5px', fontSize: '14px'}} onClick={this.cancelEdit}>Cancelar</button>
                        </div>
                    </div>
                );
            } else if (!this.props.labeled) {
                return(
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: '1%', borderStyle: 'solid', borderColor: 'orange', borderRadius: '5px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '2%', width: '65%', fontFamily: 'Sans-serif'}}>
                            <div><br/><strong>Nombre </strong>{this.props.profile.name}</div>
                            <div><br/><strong>Identificador B.D. </strong>{this.props.profile.searchId}</div>
                            <div><br/><strong>Identificador linkedIn </strong>{this.props.profile.linkedinId}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', width: '32%'}}>
                            <br/>
                            <button style={{height: '5%', width: '70%', borderRadius: '5px', fontSize: '14px'}} onClick={this.delete}>Borrar</button>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: '2.8%', borderStyle: 'solid', borderColor: 'orange', borderRadius: '5px'}}>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '2%', width: '65%', fontFamily: 'Sans-serif'}}>
                            <div><br/><strong>Nombre </strong>{this.props.profile.name}</div>
                            <div><br/><strong>Puesto </strong>{this.props.profile.puesto}</div>
                            <div><br/><strong>Label </strong>{this.props.profile.label}</div>
                            <div><br/><strong>Comentario </strong>{this.props.profile.comment}</div>
                            <div><br/><strong>Identificador B.D. </strong>{this.props.profile._id}</div>
                            <div><br/><strong>Identificador linkedIn </strong>{this.props.profile.linkedinId}</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', width: '32%'}}>
                            <br/>
                            <button style={{height: '5%', width: '70%', borderRadius: '5px', fontSize: '14px'}} onClick={this.delete}>Borrar</button>
                            <br/>
                            <button style={{height: '5%', width: '70%', borderRadius: '5px', fontSize: '14px'}} onClick={this.edit}>Editar</button>
                        </div>
                    </div>
                );
            }
        } 
    }
}