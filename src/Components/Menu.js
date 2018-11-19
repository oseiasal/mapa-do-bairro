import React from 'react';
import '../App.css';


class Menu extends React.Component {
    render(){
        return (
            <div id="menu" className="menu-option">
                <div className="button-container">
                    <input className="button show-markers" type="button" value="Mostrar Marcadores"></input>
                    <input className="button hidden-markers" type="button" value="Ocultar Marcadores"></input>
                </div>
            </div>
        )
    }

}

export default Menu;
