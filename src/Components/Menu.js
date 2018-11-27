import React from 'react';
import { PlaceItem } from './PlaceItem';
import '../App.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            markers: [],
            marcFiltered: []
        }
    }

    updateQuery = (query, marc = []) => {

        this.setState({query})
        this.props.markers.filter(marcador => {
            return marcador.title.toLowerCase().indexOf(query.toLowerCase()) > -1

        }).map(marcador => {
            return marc.push(marcador);
        });

        marc == undefined ? console.log("Não encontrado") : console.log(marc);

        this.setState({marcFiltered: marc})
    }

    render(){
        return (
            <div id="menu" className="menu-option">
            <div className="button-container">
            <input className="button show-markers" type="text"
            onChange={(event) => {this.updateQuery(event.target.value); }}>
            </input>
            </div>

            <div className="list">
            <ul>
            {this.state.query.length > 0 ? (this.state.marcFiltered.map((marker, index) => {
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
