(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(18)},15:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(9),r=n.n(i),s=(n(15),n(2)),l=n(3),c=n(5),u=n(4),d=n(6),m=n(1),p=function(){return o.a.createElement("main",null,o.a.createElement("div",{id:"map",role:"application","aria-label":"Mapa da Cidade de Guarulhos",className:"map"}))},f=function(e){var t=e.openInfoWindow,n=e.infoWindow,a=e.marker,i=function(e){t(a,n,a.map)};return o.a.createElement("li",{role:"button",tabIndex:"0",onClick:i.bind(void 0),onKeyPress:i.bind(void 0)},a.title)},v=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={error:null,errorInfo:null},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"render",value:function(){return this.state.errorInfo?o.a.createElement("div",null,o.a.createElement("h2",null,"Something went wrong."),o.a.createElement("details",{style:{whiteSpace:"pre-wrap"}},this.state.error&&this.state.error.toString(),o.a.createElement("br",null),this.state.errorInfo.componentStack)):this.props.children}}]),t}(o.a.Component),h=(n(8),function(e){var t=e.openMenu,n=e.updateQuery,a=e.query,i=e.marcFiltered,r=e.infoWindow,s=e.openInfoWindow,l=e.markers;return o.a.createElement(v,null,o.a.createElement("div",{className:"menu-option"},o.a.createElement("div",{className:"search-container"},o.a.createElement("div",{tabIndex:"0",className:"menuToggle",onKeyPress:t},o.a.createElement("input",{tabIndex:"-1",className:"checkbox",type:"checkbox"}),o.a.createElement("span",null),o.a.createElement("span",null),o.a.createElement("span",null),o.a.createElement("div",null)),o.a.createElement("input",{"aria-label":"Digite o nome do lugar",placeholder:"Digite o nome do lugar",className:"show-markers showing",type:"text",onChange:function(e){n(e.target.value)}}),o.a.createElement("div",{className:"list showing"},o.a.createElement("ul",null,a.length>0?i.map(function(e,t){return o.a.createElement(v,{key:t},o.a.createElement(f,{infoWindow:r,key:t,marker:e,openInfoWindow:s}))}):l.map(function(e,t){return o.a.createElement(v,{key:t},o.a.createElement(f,{infoWindow:r,key:t,marker:e,openInfoWindow:s}))}))))))}),g=[{title:"CIEE",location:{lat:-23.467149,lng:-46.527667},id:"4f47974ce4b0683d4e7d87cf"},{title:"Maria Cereja",location:{lat:-23.4610524,lng:-46.5302547},id:"4b2ee880f964a52023e824e3"},{title:"Bosque Maia",location:{lat:-23.4575191,lng:-46.5298792},id:"4bb2aec24019a5937f3637b8"},{title:"Wow Burger",location:{lat:-23.4577258,lng:-46.5302654},id:"4b2ed079f964a52009e724e3"},{title:"Winners Academia",location:{lat:-23.4599304,lng:-46.536059},id:"4d7b98e96152b60cdc578126"},{title:"ACM",location:{lat:-23.4635817,lng:-46.5338167},id:"4c7c43107a856dcbb7cde1a7"}],w=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).initMap=function(){try{document.getElementsByClassName("checkbox")[0].addEventListener("click",function(){document.getElementsByClassName("list")[0].classList.toggle("showing"),document.getElementsByClassName("show-markers")[0].classList.toggle("showing")})}catch(s){console.log(s)}var e=Object(m.a)(Object(m.a)(n)),t=new window.google.maps.InfoWindow({maxWidth:350,maxHeight:400});n.setState({infoWindow:t});var a=new window.google.maps.Map(document.getElementById("map"),{center:{lat:-23.4671489,lng:-46.5276668},zoom:15,mapTypeControl:!1});n.setState({map:a});for(var o=new window.google.maps.LatLngBounds,i=function(t){var i=n.state.locations[t].location,r=n.state.locations[t].title,s=n.state.locations[t].id,l=new window.google.maps.Marker({squareId:s,map:a,position:i,title:r,animation:window.google.maps.Animation.DROP,id:t});l.addListener("click",function(){e.openInfoWindow(this,e.state.infoWindow,this.map)}),n.setState(function(e){return n.state.markers.push(l)}),o.extend(n.state.markers[t].position)},r=0;r<n.state.locations.length;r++)i(r)},n.updateQuery=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=Object(m.a)(Object(m.a)(n));n.setState({query:e}),n.state.markers.filter(function(t){return t.title.toLowerCase().indexOf(e.toLowerCase())>-1}).map(function(e){return t.push(e)}),n.setState({marcFiltered:t}),setTimeout(function(){a.renderMarkers(a.state.map,a.state.marcFiltered,a.state.query)},100),n.state.markers.map(function(e){return e.setMap(null)})},n.state={locations:g,map:{},markers:[],query:"",infoWindow:""},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){window.initMap=this.initMap,this.createScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyARC-a63vxOWRRAgpjnDYOndn_2fFLYhAo&callback=initMap"),window.gm_authFailure=this.gm_authFailure}},{key:"gm_authFailure",value:function(){alert("Estamos com um problema para carregar o mapa.\nTente novamente mais tarde.")}},{key:"openMenu",value:function(){try{document.getElementsByClassName("list")[0].classList.toggle("showing"),document.getElementsByClassName("show-markers")[0].classList.toggle("showing")}catch(e){console.log(e)}}},{key:"renderMarkers",value:function(e,t,n){setTimeout(function(){0===n.length&&t.map(function(t){return t.setMap(e)})},10),t.map(function(a){return a.title!==n.toLowerCase().indexOf(n.toLowerCase())>-1?t.map(function(t){return t.setMap(e)}):0})}},{key:"openInfoWindow",value:function(e,t,n){t.marker=null,t.close(),t.marker!==e&&(t.marker=e,t.setContent("<div>"+e.title+"</div>"),t.open(n,e),e.setAnimation(window.google.maps.Animation.BOUNCE),this.state.map.setCenter(e.getPosition()),this.state.map.panBy(0,30),setTimeout(function(){t.marker.setAnimation(null)},1500),t.addListener("closeclick",function(){t.close(),t.marker.setMarker=null}),this.callFoursSquareInfos(e))}},{key:"callFoursSquareInfos",value:function(e){var t=this;fetch("https://api.foursquare.com/v2/venues/"+e.squareId+"?&client_id=RPG2KU5WWCUL345BGVBOVBI2UYVKNSRNHCTPOT0LVDRVIZFK&client_secret=WPVUMYBEEB1MS0HS4AWOY44WIA00CN4UG5DVVQZ0PT0POK2B&v=20131212").then(function(n){return n.json().then(function(n){if(200!==n.meta.code){var a="<div><strong>"+e.title+"</strong></div></br>";return t.state.infoWindow.setContent(a+"<div>Sem informa\xe7\xf5es sobre o local, por enquanto. <br> Tente novamente mais tarde.</div>")}if(void 0!==n.response.venue){var o='<div style="font-size:18px"><b>'+e.title+"</b></div>",i="<div> <b>Categoria</b>: "+n.response.venue.categories[0].pluralName+"</div>",r="<div> <b>Endere\xe7o:</b> "+(void 0===n.response.venue.location.address?"Rua sem nome":n.response.venue.location.address)+"</div>",s="<div> <b>Gostaram do lugar:</b> "+(void 0===n.response.venue.likes.summary?"Sem informa\xe7\xe3o":n.response.venue.likes.summary)+"</div>",l="<div> <b>Telefone:</b> "+(void 0===n.response.venue.contact.formattedPhone?"Sem telefone":n.response.venue.contact.formattedPhone)+"</div>",c="<div> <b>Site:</b> "+(void 0===n.response.venue.url?"indispon\xedvel no momento <br>":"<a href="+n.response.venue.url+">"+n.response.venue.url+"</a></div>");return t.state.infoWindow.setContent(o+"<br>"+i+r+s+l+c+"<br><div><code> Elaborado com Api do 4Square</code></div>")}}).catch(function(e){return window.alert("Algo deu errado.\nPor favor, tente novamente mais tarde.")})}).catch(function(e){return window.alert("Algo deu errado.\n Por favor, tente novamente mais tarde.")})}},{key:"createScript",value:function(e){var t=window.document.getElementsByTagName("script")[0],n=window.document.createElement("script");n.src=e,n.async=!0,n.defer=!0,t.parentNode.insertBefore(n,t)}},{key:"render",value:function(){return o.a.createElement("div",{className:"container"},o.a.createElement("header",{className:"header"}," Mapa do Bairro "),o.a.createElement("nav",null,o.a.createElement(v,null,o.a.createElement(h,{openMenu:this.openMenu.bind(this),query:this.state.query,marcFiltered:this.state.marcFiltered,updateQuery:this.updateQuery.bind(this),openInfoWindow:this.openInfoWindow.bind(this),infoWindow:this.state.infoWindow,markers:this.state.markers,map:this.state.map}))),o.a.createElement(v,null,o.a.createElement(p,null)))}}]),t}(a.Component),b=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function k(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(o.a.createElement(v,null,o.a.createElement(w,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/mapa-do-bairro",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/mapa-do-bairro","/service-worker.js");b?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):k(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):k(t,e)})}}()},8:function(e,t,n){}},[[10,2,1]]]);
//# sourceMappingURL=main.d996f0ac.chunk.js.map
