import React from 'react';
import { PlaceItem } from './PlaceItem';
import '../App.css';

class Menu extends React.Component {

    render(){
        return (
            <div id="menu" className="menu-option">
            <div className="button-container">
            <input className="button show-markers" type="text"
            onChange={(event) => {this.props.updateQuery(event.target.value); }}>
            </input>
            </div>

            <div className="list">
            <ul>
            {this.props.query.length > 0 ? (this.props.marcFiltered.map((marker, index) => {
                return <PlaceItem
                infoWindow={this.props.infoWindow}
                key={index}
                marker={marker}
                openInfoWindow={this.props.openInfoWindow}
                />
            })) : (this.props.markers.map((marker, index) => {
                return <PlaceItem
                infoWindow={this.props.infoWindow}
                key={index}
                marker={marker}
                openInfoWindow={this.props.openInfoWindow}
                />
            }))}
            </ul>
            </div>
            </div>
        )
    }
}

export default Menu;
