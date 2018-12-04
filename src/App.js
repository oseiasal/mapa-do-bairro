import React, { Component } from 'react';
import Map from './Components/Map';
import Menu from './Components/Menu';
import { Places } from './data/locations';
import { PrivateKey } from './data/UserKey';
import ErrorBoundary from './catch/ErrorBoundary';
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
        window.gm_authFailure = this.gm_authFailure;
    }

     gm_authFailure() {
        alert("Estamos com um problema para carregar o mapa.\nTente novamente mais tarde.");
    }

    // Esta função faz altera as classes do menu para exibir as listas
    openMenu(){

        try {
            document.getElementsByClassName('list')[0].classList.toggle('showing');
            document.getElementsByClassName('show-markers')[0].classList.toggle('showing');
        } catch (e) {
            console.log(e)
        }
    }

    // chamar a função initMap
    initMap = () => {

        try {
            document.getElementsByClassName('checkbox')[0].addEventListener('click', () => {
                document.getElementsByClassName('list')[0].classList.toggle('showing');
                document.getElementsByClassName('show-markers')[0].classList.toggle('showing');
            })
        } catch (e) {
            console.log(e)
        }

        let self = this;

        let infoWindow = new window.google.maps.InfoWindow({maxWidth: 350, maxHeight: 400});
        this.setState({'infoWindow': infoWindow})

        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -23.4671489, lng: -46.5276668},
            zoom: 15,
            mapTypeControl: false
        });
        this.setState({'map': map});

        let bounds = new window.google.maps.LatLngBounds();

        for (let i = 0; i < this.state.locations.length; i++) {
            let position = this.state.locations[i].location;
            let title = this.state.locations[i].title;
            let squareId = this.state.locations[i].id;

            // Criar um marcador por localização, e colocá-los em uma vetor de marcadores.
            let marker = new window.google.maps.Marker({
                squareId: squareId,
                map: map,
                position: position,
                title: title,
                animation: window.google.maps.Animation.DROP,
                id: i
            });

            // Adicionar escuta de click para abrir a infoWindow
            marker.addListener('click', function() {
                self.openInfoWindow(this, self.state.infoWindow, this.map);
            });

            // Adicionar os marcadores ao state
            this.setState( (markers) => {
                markers = this.state.markers.push(marker);
                return markers;
            });

            bounds.extend(this.state.markers[i].position);
        }

    }

    // Ao pesquisar os lugares, esta função irá manipular os marcadores no mapa
    renderMarkers(map, marker, query){

        // Manipula os marcadores para que eles tenham um delay ao serem pesquisados
        setTimeout(function () {
            if (query.length === 0) {
                marker.map(item => {
                    return item.setMap(map)
                })
            }
        }, 10);

        // Filtra os marcadores baseado no texto da query (state)
        marker.map(marcador => {
            if (marcador.title !== (query.toLowerCase().indexOf(query.toLowerCase()) > -1)) {
                return marker.map(item => {
                    return item.setMap(map)
                });
            }
            return 0;
        })
    }

    // Esta função atualiza a query
    updateQuery = (query, marc = []) => {
        let self = this;
        this.setState({query})
        this.state.markers.filter(marcador => {
            return marcador.title.toLowerCase().indexOf(query.toLowerCase()) > -1

        }).map(marcador => {
            return marc.push(marcador);
        });

        this.setState({marcFiltered: marc});

        // A função renderMarkers só será iniciada após os 100ms
        setTimeout(function () {
            self.renderMarkers(self.state.map, self.state.marcFiltered, self.state.query)
        }, 100);

        this.state.markers.map(a => {
            return a.setMap(null)
        })

    }

    // Esta função abre as InfoWindow dos marcadores
    openInfoWindow(marker, infoWindow, map) {
        infoWindow.marker = null;
        infoWindow.close();

        if (infoWindow.marker !== marker) {
            infoWindow.marker = marker;
            infoWindow.setContent('<div>' + marker.title + '</div>');
            infoWindow.open(map, marker);
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            this.state.map.setCenter(marker.getPosition());
            this.state.map.panBy(0, 30);

            // Após 1,5 segundos, a animação do marcador é desativada
            setTimeout(function () {
                infoWindow.marker.setAnimation(null);
            }, 1500);

            infoWindow.addListener('closeclick', () => {
                infoWindow.close();
                infoWindow.marker.setMarker = null;
            });
            this.callFoursSquareInfos(marker);
        }
    }

    // A função pega a ID do marcador e passa para a url do foursquare para obter dados sobre o lugar

    callFoursSquareInfos(marker){
        fetch('https://api.foursquare.com/v2/venues/'+ marker.squareId +'?&client_id='+ ClienteID +'&client_secret='+ ClientSecret +'&v=20131212')
        .then((response) => {
            return response.json().then(dados => {
                if (dados.meta.code !== 200) {
                    let title = '<div><strong>' + marker.title + '</strong></div></br>';
                    return this.state.infoWindow.setContent(title + '<div>Sem informações sobre o local, por enquanto. <br> Tente novamente mais tarde.</div>')

                }

                if (dados.response.venue !== undefined) {
                    let title = '<div style="font-size:18px"><b>'+ marker.title + '</b></div>'
                    let local = '<div> <b>Categoria</b>: ' + dados.response.venue.categories[0].pluralName + '</div>'
                    let street = '<div> <b>Endereço:</b> ' + (dados.response.venue.location.address === undefined ? "Rua sem nome" : dados.response.venue.location.address) + '</div>'
                    let hereNoe = '<div> <b>Gostaram do lugar:</b> ' + (dados.response.venue.likes.summary === undefined ? 'Sem informação': dados.response.venue.likes.summary) + '</div>'
                    let telefone = '<div> <b>Telefone:</b> ' + (dados.response.venue.contact.formattedPhone === undefined ? 'Sem telefone' : dados.response.venue.contact.formattedPhone) + '</div>'
                    let site = '<div> <b>Site:</b> ' + (dados.response.venue.url === undefined ? 'indisponível no momento <br>' : '<a href=' + dados.response.venue.url + '>'+dados.response.venue.url+'</a></div>')
                    let foursquare = '<div><code> Elaborado com Api do 4Square</code></div>'
                    return this.state.infoWindow.setContent(title + '<br>' + local + street + hereNoe + telefone + site +'<br>' + foursquare)
                }
            }).catch((erro) => {
                return window.alert("Algo deu errado.\nPor favor, tente novamente mais tarde.");
            })
        }).catch((erro) => {
            return window.alert("Algo deu errado.\n Por favor, tente novamente mais tarde.");
        })
    }

    // Função criada para colocar o script do google no html
    createScript(src) {
        // Selecionar ponto de referencia
        let index = window.document.getElementsByTagName("script")[0];
        // criar o script
        let script = window.document.createElement("script");
        // definir os atributos
        script.src = src;
        script.async = true;
        script.defer = true;

        // inserir antes do primeiro script
        index.parentNode.insertBefore(script, index);
    }

    render() {
            return (
                <div className="container">
                <header className="header"> Mapa do Bairro </header>
                 <nav>
                 <ErrorBoundary>
                 <Menu
                 openMenu={this.openMenu.bind(this)}
                 query={this.state.query}
                 marcFiltered={this.state.marcFiltered}
                 updateQuery={this.updateQuery.bind(this)}
                 openInfoWindow={this.openInfoWindow.bind(this)}
                 infoWindow={this.state.infoWindow}
                 markers={this.state.markers}
                 map={this.state.map}
                 />
                </ErrorBoundary>
                    </nav>

                    <ErrorBoundary>
                    <Map />
                    </ErrorBoundary>

                </div>
                )
            }
    }

    export default App;
