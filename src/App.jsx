import React from 'react';
import ProfileList from './ProfileList.jsx';
import Filter from './Filter.jsx';
import ProfileBig from './ProfileBig.jsx';
import { Alert } from 'reactstrap';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: "",
            profile: "",
            page: 1,
            params: "",
            totalPages: "",
            edit: false,
            noProfiles: false,
            visible: false,
            alerMessage: "",
            color: "primary",
            url: "",
            labeled: true,
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.search = this.search.bind(this);
        this.onClick = this.onClick.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    render() {
        return (
          <div style={{height: '100%'}}>
              <h1 style={{textAlign: 'center', marginTop: '2%', color: 'orange'}}>Talento Learning</h1>
              <Filter search={this.search}/>
                  <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss} color={this.state.color}>
                      {this.state.alerMessage}
                  </Alert>
              <div style={{display: 'flex', flexDirection: 'row', width: '98%', height: '90%', marginLeft: '1%', overflowY: 'scroll'}}>
                  <ProfileList labeled={this.state.labeled} pages={this.state.page} profiles={this.state.profiles} onClick={this.onClick} nextPage={this.nextPage} previousPage={this.previousPage} page={this.state.page} totalPages={this.state.totalPages}/>
                  <ProfileBig labeled={this.state.labeled} profile={this.state.profile} delete={this.delete} edit={this.edit} editEnabled={this.state.edit} saveEdit={this.saveEdit} cancelEdit={this.cancelEdit}/>
              </div>
          </div>
      );
    }

    onDismiss() {
        this.setState({
            visible: false,
            color: "primary",
        });
    }

    search(urlAux, page, labeled) {
        console.log(this.state.page, "En buscar");
        let pageAux = page ? page : this.state.page;
        let url = urlAux + "page="+pageAux;
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState === 4) {
                if(req.status === 200) {
                    if (!labeled) {
                        labeled = this.state.labeled;
                    }
                    let profiles = this.state.labeled ? JSON.parse(req.response).data : JSON.parse(req.response).allUnlabeledProfiles;
                    console.log(profiles);
                    if (profiles.length === 0) {
                        this.setState({
                          visible: true,
                          alerMessage: "No hay visitas con las opciones seleccionadas",
                          profiles: [],
                          labeled: labeled,
                        });
                    } else {
                        let totalPages = labeled ? JSON.parse(req.response).meta.totalPages: '0';
                        this.setState({
                            profiles: profiles,
                            url: urlAux,
                            totalPages: totalPages,
                            profile: "",
                            labeled: labeled,
                        });
                    }
                } else {
                    this.setState({
                        visible: true,
                        alerMessage: "Error en la descarga",
                        color: "danger",
                    });
                }
            }
        }
        req.open('GET', url);
        req.send(null);
    }

    nextPage() {
        let newPage = this.state.page+1;
        this.setState({
            page: newPage,
        });
        this.search(this.state.url, newPage);
    }

    previousPage() {
      let newPage = this.state.page-1;
      this.setState({
        page: newPage,
      });
      this.search(this.state.url, newPage);
    }

    onClick(profile) {
        console.log("ON CLICK");
        this.setState({
            profile: profile,
        });
    }

    delete(id, labeled) {
        let req = new XMLHttpRequest();
        let url;
        if (labeled) {
            url = "https://34.248.142.102/api-linkedin/v1/profiles/"+id;
        } else {
            url = "https://34.248.142.102/api-linkedin/v1/unlabeledProfiles/"+id
        }
        req.onreadystatechange = () => {
            if(req.readyState === 4) {
                if(req.status === 200) {
                    this.setState({
                        profile: "",
                        visible: true,
                        alerMessage: "Perfil borrado correctamente",
                        color: "success",
                    });
                    this.search(this.state.url, this.state.page);
                } else {
                    this.setState({
                        visible: true,
                        alerMessage: "No se ha podido eliminar el perfil",
                        color: "danger",
                    });
                }
            }
        }
        req.open('DELETE', url);
        req.send(null);
        console.log("Eliminar");
    }

    edit() {
        this.setState({
            edit: true,
        });
        console.log("Editar");
    }

    saveEdit(profile) {
        // Petición y cambiar el profile en la lista
        console.log(profile);
        let url = "https://34.248.142.102/api-linkedin/v1/profiles/"+profile._id;
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState === 4) {
                if(req.status === 200) {
                    this.setState({
                        edit: false,
                        profile: profile,
                        visible: true,
                        alerMessage: "Perfil actualizado correctamente",
                    });
                } else {
                    this.setState({
                      edit: false,
                      visible: true,
                      alerMessage: "Ha habido un error actualizando el perfil",
                    });
                }
            }
        }
        req.open('PUT', url);
        req.setRequestHeader('Content-type','application/json');
        req.send(JSON.stringify(profile));
    }

    cancelEdit() {
      this.setState({
          edit: false,
      });
    }

}
export default App;
