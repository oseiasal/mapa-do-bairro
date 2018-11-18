/* global google */
import React, { Component } from 'react';
import Map from './Components/Map'
import './App.css';

class App extends Component {

    state = {
        map: {}
    }

    componentDidMount () {
        window.initMap = this.initMap;
        this.createScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDVOph5H2ON8d7d3maVA_t9UkTTxkRhuZA&callback=initMap');

    }

    // chamar a função initMap
    initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });

    }

    render() {
        return (
            <Map />
        )
    }

    createScript(src) {
        // Selecionar ponto de referencia
        var ref = window.document.getElementsByTagName("script")[0];
        // criar o script
        var script = window.document.createElement("script");
        // definir os atributos
        script.src = src;
        script.async = true;

        // inserir antes do primeiro script
        ref.parentNode.insertBefore(script, ref);
    }
}

export default App;
