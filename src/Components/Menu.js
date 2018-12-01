import React from 'react';
import { PlaceItem } from './PlaceItem';
import '../App.css';

class Menu extends React.Component {

    render(){
        return (
            <div className="menu-option">
            <div className="search-container">
            <div className="menuToggle">
            <input className="checkbox" type="checkbox" />

            <span></span>
            <span></span>
            <span></span>
            <div></div>

            </div>
            <input placeholder="Digite o nome do lugar" className="show-markers showing" type="text"
            onChange={(event) => {this.props.updateQuery(event.target.value); }}>
            </input>
            

            <div className="list showing">
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
            </div>
    )
}
}

export default Menu;
