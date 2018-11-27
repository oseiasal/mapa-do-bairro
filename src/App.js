import React, { Component } from 'react';
import Map from './Components/Map';
import Menu from './Components/Menu';
import { Places } from './data/locations';
import { PrivateKey } from './data/UserKey';
import './App.css';

class App extends Component {

    state = {
        'locations': Places ,
        'map': {},
        'markers': [],
        'query': '',
        'infoWindow': ''
    }

    componentDidMount () {
        window.initMap = this.initMap;
        this.createScript('https://maps.googleapis.com/maps/api/js?key=' + PrivateKey + '&callback=initMap');
    }

    // chamar a função initMap
    initMap = () => {
        var self = this;

        var infoWindow = new window.google.maps.InfoWindow();
        this.setState({'infoWindow': infoWindow})

        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -23.440246, lng: -46.3828834},
            zoom: 16,
            mapTypeControl: false
        });
        this.setState({'map': map});

        var bounds = new window.google.maps.LatLngBounds();

        for (var i = 0; i < this.state.locations.length; i++) {
            // Get the position from the location array.
            var position = this.state.locations[i].location;
            var title = this.state.locations[i].title;

            // Create a marker per location, and put into markers array.
            var marker = new window.google.maps.Marker({
                map: map,
                position: position,
                title: title,
                animation: window.google.maps.Animation.DROP,
                id: i
            });

            marker.addListener('click', function() {
                self.openInfoWindow(this, self.state.infoWindow, this.map);
            });

            this.state.markers.push(marker);
            this.setState({});

            bounds.extend(this.state.markers[i].position);
        }
    }

render() {

    return (
        <section className="container">
            <Menu
                openInfoWindow={this.openInfoWindow.bind(this)}
                infoWindow={this.state.infoWindow}
                markers={this.state.markers}
                map={this.state.map}
            />
            <Map />
        </section>
    )
}

openInfoWindow(marker, infoWindow, map) {
    if (infoWindow.marker !== marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div>' + marker.title + '</div>');
        infoWindow.open(map, marker);
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);

        infoWindow.addListener('closeclick', () => {
            infoWindow.setMarker = null;
        });
    }
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
        script.onerror = () => {
            alert("Erro ao carregar o mapa, verifique novamente.");
        };
        // inserir antes do primeiro script
        index.parentNode.insertBefore(script, index);
    }
}

export default App;
