import React from 'react';

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    nextPage() {
        this.props.nextPage();
    }

    previousPage() {
        this.props.previousPage();
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '42%', alignItems: 'center'}}>
                    <button style={{height: '20px', width: '20px', borderRadius: '2px', fontSize: '10px', marginRight: '8px'}} onClick={this.previousPage} disabled={this.props.page === 1}> &lt; </button>
                    {this.props.page}
                    <button style={{height: '20px', width: '20px', borderRadius: '2px', fontSize: '10px', marginLeft: '8px'}} onClick={this.nextPage} disabled={this.props.page === this.props.totalPages}> &gt; </button>
            </div>
        );
    }
}