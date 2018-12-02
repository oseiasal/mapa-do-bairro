import React from 'react';

export class PlaceItem extends React.Component {

    callOpenInfoWindow = (context) => {
        this.props.openInfoWindow(this.props.marker, this.props.infoWindow, this.props.marker.map);

    }

    render () {
        return (
            <li role="button" tabIndex="0" onClick={this.callOpenInfoWindow.bind(this)} onKeyPress={this.callOpenInfoWindow.bind(this)}>
                {this.props.marker.title}
            </li>
        )
    }
}
