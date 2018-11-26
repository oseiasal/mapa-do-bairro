import React from 'react';
import { PlaceItem } from './PlaceItem';
import '../App.css';

class Menu extends React.Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query});
    }

    render(){
        var self = this;
        return (
            <div id="menu" className="menu-option">
                <div className="button-container">
                    <input className="button show-markers" type="text" value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}>
                    </input>
                </div>

                <div className="list">
                    <ul>
                    {this.props.markers.map((marker, index) => {
                        return <PlaceItem
                        infoWindow={self.props.infoWindow}
                        key={index}
                        marker={marker}
                        openInfoWindow={this.props.openInfoWindow}
                        />
                    })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Menu;
