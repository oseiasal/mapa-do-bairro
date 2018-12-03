import React from 'react';

const PlaceItem = ({openInfoWindow, infoWindow, marker}) => {

    // Esta função chama o InfoWindow
    const callOpenInfoWindow = (context) => {
        openInfoWindow(marker, infoWindow, marker.map);

    }

        return (
            <li role="button" tabIndex="0" onClick={callOpenInfoWindow.bind(this)} onKeyPress={callOpenInfoWindow.bind(this)}>
                {marker.title}
            </li>
        )
}

export default PlaceItem
