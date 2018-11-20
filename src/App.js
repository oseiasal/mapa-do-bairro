/* global google */
import React, { Component } from 'react';
import Map from './Components/Map';
import Menu from './Components/Menu';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {title: 'Frequência Fit', location: {lat: -23.438605, lng: -46.384569}},
                {title: '4You Academia', location: {lat: -23.440227, lng: -46.385222}},
                {title: 'Supermercados X', location: {lat: -23.438605, lng: -46.384144}},
                {title: 'Mercado Villa Real', location: {lat: -23.441339, lng: -46.383498}}
            ],
            map: {},
            markers: []
        }
    }

    componentDidMount () {
        window.initMap = this.initMap;
        this.createScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDVOph5H2ON8d7d3maVA_t9UkTTxkRhuZA&callback=initMap');
    }

    populateInfoWindow = (marker, infoWindow, map) => {
       if (infoWindow.marker != marker) {
           infoWindow.marker = marker;
           infoWindow.setContent('<div>' + marker.title + '</div>');
           infoWindow.open(map, marker);
           // Make sure the marker property is cleared if the infoWindow is closed.
           infoWindow.addListener('closeclick',function(){
               infoWindow.setMarker = null;
           });
       }
    }

    // chamar a função initMap
    initMap = () => {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -23.440246, lng: -46.3828834},
            zoom: 16,
            mapTypeControl: false
        });

        this.setState({'map': map});

        var bounds = new google.maps.LatLngBounds();
        var largeInfowindow = new google.maps.InfoWindow();

        for (var i = 0; i < this.state.locations.length; i++) {
          // Get the position from the location array.
          var position = this.state.locations[i].location;
          var title = this.state.locations[i].title;

          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });

        this.state.markers.push(marker);
        bounds.extend(this.state.markers[i].position);
        var infoWindow = new google.maps.InfoWindow();

        marker.addListener('click', function() {

            if (infoWindow.marker !== this) {
                infoWindow.marker = this;

                infoWindow.setContent('<div>' + this.title + '</div>');
                infoWindow.open(map, this);
                // Make sure the marker property is cleared if the infoWindow is closed.
                infoWindow.addListener('closeclick',function(){
                    infoWindow.setMarker = null;
                });
            }
        });

    }
}




render() {
    return (
        <section className="container">
        <Menu />
        <Map />
        </section>
    )
}

    createScript(src) {
        // Selecionar ponto de referencia
        var index = window.document.getElementsByTagName("script")[0];
        // criar o script
        var script = window.document.createElement("script");
        // definir os atributos
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = function() {
            console.log("O mapa foi carregado");
        };
        script.onerror = function() {
            alert("Erro ao carregar o mapa, verifique novamente.");
        };
        // inserir antes do primeiro script
        index.parentNode.insertBefore(script, index);
    }
}

export default App;
