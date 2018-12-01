import React, { Component } from 'react';
import Map from './Components/Map';
import Menu from './Components/Menu';
import { Places } from './data/locations';
import { PrivateKey } from './data/UserKey';
import { ClienteID } from './data/UserKey';
import { ClientSecret } from './data/UserKey';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'locations': Places,
            'map': {},
            'markers': [],
            'query': '',
            'infoWindow': ''
        }
    }

    componentDidMount () {
        window.initMap = this.initMap;
        this.createScript('https://maps.googleapis.com/maps/api/js?key=' + PrivateKey + '&callback=initMap');
    }

    // chamar a função initMap
    initMap = () => {

        document.getElementsByClassName('checkbox')[0].addEventListener('click', () => {
            document.getElementsByClassName('list')[0].classList.toggle('showing');
            document.getElementsByClassName('show-markers')[0].classList.toggle('showing');
        })

        var self = this;

        var infoWindow = new window.google.maps.InfoWindow();
        this.setState({'infoWindow': infoWindow})

        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -23.4671489, lng: -46.5276668},
            zoom: 15,
            mapTypeControl: false
        });
        this.setState({'map': map});

        var bounds = new window.google.maps.LatLngBounds();

        for (var i = 0; i < this.state.locations.length; i++) {
            // Get the position from the location array.
            var position = this.state.locations[i].location;
            var title = this.state.locations[i].title;
            var squareId = this.state.locations[i].id;

            // Create a marker per location, and put into markers array.
            var marker = new window.google.maps.Marker({
                squareId: squareId,
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

    renderMarkers(map, marker, query){
        setTimeout(function () {
            if (query.length == 0) {
                marker.map(item => {

                    return item.setMap(map)
                })
            }
        }, 10);


        marker.map(marcador => {

            if (marcador.title !== (query.toLowerCase().indexOf(query.toLowerCase()) > -1)) {
                return marker.map(item => {
                    return item.setMap(map)
                });
            }
        })
    }

    updateQuery = (query, marc = []) => {
        var self = this;
        this.setState({query})
        this.state.markers.filter(marcador => {
            return marcador.title.toLowerCase().indexOf(query.toLowerCase()) > -1

        }).map(marcador => {
            return marc.push(marcador);
        });

        marc == undefined ? console.log("Não encontrado") : console.log('definido');

        this.setState({marcFiltered: marc});

        setTimeout(function () {
            self.renderMarkers(self.state.map, self.state.marcFiltered, self.state.query)

        }, 50);

        this.state.markers.map(a => {
            return a.setMap(null)
        })

    }

    render() {

        return (
            <section className="container">
            <div className="header"> Mapa do Bairro </div>
             <div>
             <Menu
                query={this.state.query}
                marcFiltered={this.state.marcFiltered}
                updateQuery={this.updateQuery.bind(this)}
                openInfoWindow={this.openInfoWindow.bind(this)}
                infoWindow={this.state.infoWindow}
                markers={this.state.markers}
                map={this.state.map}
                />
                <Map />
             </div>

            </section>
            )
        }

        openInfoWindow(marker, infoWindow, map) {
            if (infoWindow.marker !== marker) {
                infoWindow.marker = marker;
                infoWindow.setContent('<div>' + marker.title + '</div>');
                infoWindow.open(map, marker);
                this.state.map.setCenter(marker.getPosition());
                this.state.map.panBy(0, 30);

                infoWindow.addListener('closeclick', () => {
                    infoWindow.setMarker = null ;
                });


                this.chamaApiFourSquare(marker)
            }

        }

        chamaApiFourSquare(marker){
            fetch('https://api.foursquare.com/v2/venues/'+marker.squareId+'?&client_id='+ClienteID+'&client_secret='+ ClientSecret +'&v=20131212')
            .then((response) => {
                return (response).json().then(dados => {
                    if (dados.meta.code !== 400) {
                        var title = '<div><strong>' + marker.title + '</strong></div></br>';
                        var error = dados.meta.errorDetail;
                        return this.state.infoWindow.setContent(title + '<div> Não foi possível acessar a API do foursquare.<br> <br> <code>Erro: '+ error +' </code></div>')

                    }

                    if (dados.response.venue != undefined) {
                        var title = '<div style="font-size:18px">' + '<b>'+ marker.title + '</b></div><br>'
                        var foto = '<img src=' + dados.response.venue.bestPhoto.prefix +'320x200'+ dados.response.venue.bestPhoto.suffix + '><br>'
                        var local = '<div> <b>Categoria</b>: ' + dados.response.venue.categories[0].pluralName + '</div><br>'
                        var street = '<div> <b>Endereço:</b> ' + (dados.response.venue.location.address == undefined ? "Rua sem nome" : dados.response.venue.location.address) + '</div><br>'
                        var hereNoe = '<div> <b>Pessoas no lugar:</b> ' + dados.response.venue.hereNow.summary + '</div><br>'
                        var foursquare = '<div><code> Elaborado com Api do 4Square</code></div>'
                        return this.state.infoWindow.setContent(title + local + street + hereNoe + foto + foursquare)
                    }
                }).catch(error => {return console.log(error)})
            }).catch(error => {return console.log(error)})
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
