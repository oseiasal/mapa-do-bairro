import React from 'react';

export class PlaceItem extends React.Component {

    openInfoWindow(marker, infoWindow, map) {
        if (infoWindow.marker !== marker) {
            infoWindow.marker = marker;
            infoWindow.setContent('<div>' + marker.title + '</div>');
            infoWindow.open(map, marker);
            marker.map.setCenter(marker.getPosition());
            marker.map.panBy(0, 0);

            infoWindow.addListener('closeclick', () => {
                infoWindow.setMarker = null;
            });
        }
    }


    callOpenInfoWindow = (context) => {
        this.openInfoWindow(this.props.marker, this.props.infoWindow, this.props.marker.map);
    }

    render () {
        return (
            <li>
                <span
                onClick={this.callOpenInfoWindow.bind()}>
                {this.props.marker.title}
                </span>
            </li>
        )
    }
}
