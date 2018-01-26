import React from 'react';
import ProfileSmall from './ProfileSmall.jsx'
import Paginatior from './Paginator.jsx';

export default class ProfileList extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.nextPage = this.previousPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    onClick(profile) {
        this.props.onClick(profile);
    }

    nextPage() {
        this.props.nextPage();
    }

    previousPage() {
        this.props.previousPage();
    }

    render() {
        if (this.props.profiles.length === 0) {
            return(
                <div style={{width: '45%'}}>
                </div>
            );
        } else if(this.props.labeled) {
            let profileList = this.props.profiles.map((profile, index) => {
                return(
                    <div key={index} style={{width: '100%'}}>
                        <ProfileSmall labeled={this.props.labeled} profile={profile} onClick={this.onClick}/>
                    </div>
                );
            });
            return(
                <div style={{width: '45%', height: '100%'}}>
                    <div style={{alignSelf: 'center', width: '100%'}}>
                        <Paginatior page={this.props.page} totalPages={this.props.totalPages} nextPage={this.props.nextPage} previousPage={this.props.previousPage}/>
                    </div>
                    <div style={{marginTop: '3%', overflowY: 'scroll', height: '90%'}}>
                        {profileList}
                    </div>
                </div>
            );
        } else {
            let profileList = this.props.profiles.map((profile, index) => {
                return(
                    <div key={index} style={{width: '100%'}}>
                        <ProfileSmall labeled={this.props.labeled} profile={profile} onClick={this.onClick}/>
                    </div>
                );
            });
            return(
                <div style={{width: '45%', height: '100%'}}>
                    <div style={{marginTop: '3%', overflowY: 'scroll', height: '90%'}}>
                        {profileList}
                    </div>
                </div>
            );
        }
    }
}