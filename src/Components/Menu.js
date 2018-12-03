import React from 'react';
import  PlaceItem  from './PlaceItem';
import '../App.css';

const Menu = ({openMenu, updateQuery, query, marcFiltered, infoWindow, openInfoWindow, markers}) => {

        return (
            <div className="menu-option">
                <div className="search-container">
                    <div tabIndex="0"  className="menuToggle" onKeyPress={openMenu} >
                        <input  tabIndex="-1" className="checkbox" type="checkbox"></input>

                        <span></span>
                        <span></span>
                        <span></span>
                        <div></div>

                    </div>

                    <input aria-label="Digite o nome do lugar" placeholder="Digite o nome do lugar" className="show-markers showing" type="text"
                onChange={(event) => {updateQuery(event.target.value); }}>
                    </input>

                    <div className="list showing">
                        <ul>
                        {query.length > 0 ? (marcFiltered.map((marker, index) => {
                            return <PlaceItem
                            infoWindow={infoWindow}
                            key={index}
                            marker={marker}
                            openInfoWindow={openInfoWindow}
                            />
                        })) : (markers.map((marker, index) => {
                            return <PlaceItem
                            infoWindow={infoWindow}
                            key={index}
                            marker={marker}
                            openInfoWindow={openInfoWindow}
                            />
                        }))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

export default Menu;
