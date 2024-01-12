import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Input, message } from 'antd';
import './res/brujula.css'

const MapaActual = ({ latitud, longitud, onSaveCoordinates }) => {
  const defaultLat = -1.0120960779505797;
  const defaultLng = -79.47119403153062;

  const mapRef = useRef(null);
  const [inputLat, setInputLat] = useState(latitud || defaultLat);
  const [inputLng, setInputLng] = useState(longitud || defaultLng);

  useEffect(() => {
    const currentLat = latitud || defaultLat;
    const currentLng = longitud || defaultLng;

    if (!mapRef.current) {
      const newMap = L.map('map').setView([currentLat, currentLng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(newMap);

      if (latitud !== null && longitud !== null && latitud !== undefined && longitud !== undefined) {
        const marker = L.marker([currentLat, currentLng]).addTo(newMap);
        mapRef.current = { map: newMap, marker };
      } else {
        const messageMarker = L.marker([defaultLat, defaultLng]).addTo(newMap);
        mapRef.current = { map: newMap, marker: messageMarker };
      }

      newMap.on('click', handleMapClick);
    } else {
      mapRef.current.map.setView([currentLat, currentLng], 13);

      if (mapRef.current.marker) {
        mapRef.current.marker.setLatLng([currentLat, currentLng]);
      }
    }
  }, [latitud, longitud, defaultLat, defaultLng]);

  const handleAnimateToMarker = () => {
    if (mapRef.current && mapRef.current.marker) {
      const marker = mapRef.current.marker;
      mapRef.current.map.setView(marker.getLatLng(), 13, { animate: true });
    }
  };

  const handleMapClick = (event) => {
    const clickedLat = event.latlng.lat;
    const clickedLng = event.latlng.lng;
    setInputLat(clickedLat);
    setInputLng(clickedLng);

    if (mapRef.current && mapRef.current.marker) {
      mapRef.current.map.removeLayer(mapRef.current.marker);
    }

    const newMarker = L.marker([clickedLat, clickedLng]).addTo(mapRef.current.map);
    mapRef.current.marker = newMarker;
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === 'lat') {
      setInputLat(value);
    } else if (type === 'lng') {
      setInputLng(value);
    }
  };

  const handleSaveCoordinates = () => {
    const newLat = parseFloat(inputLat);
    const newLng = parseFloat(inputLng);

    if (!isNaN(newLat) && !isNaN(newLng)) {
      onSaveCoordinates(newLat, newLng);
      message.loading('Cargando...');
    } else {
      message.error('Por favor, ingrese coordenadas válidas');
    }
  };

  const handleSetCoordinates = () => {
    const newLat = parseFloat(inputLat);
    const newLng = parseFloat(inputLng);

    if (!isNaN(newLat) && !isNaN(newLng)) {
      if (mapRef.current && mapRef.current.marker) {
        mapRef.current.map.removeLayer(mapRef.current.marker);
      }

      const newMarker = L.marker([newLat, newLng]).addTo(mapRef.current.map);
      mapRef.current.marker = newMarker;
      handleAnimateToMarker();
    }
  };

  return (
    <div>
      <div>
        <Row>
          <Col md={2} style={{margin:'2%'}}>
            <svg class="pl" viewBox="0 0 160 160" width="160px" height="160px" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#000"></stop>
                  <stop offset="100%" stop-color="#fff"></stop>
                </linearGradient>
                <mask id="mask1">
                  <rect x="0" y="0" width="160" height="160" fill="url(#grad)"></rect>
                </mask>
                <mask id="mask2">
                  <rect x="28" y="28" width="104" height="104" fill="url(#grad)"></rect>
                </mask>
              </defs>

              <g>
                <g class="pl__ring-rotate">
                  <circle class="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(223,90%,55%)" stroke-width="16" stroke-dasharray="452.39 452.39" stroke-dashoffset="452" stroke-linecap="round" transform="rotate(-45,80,80)"></circle>
                </g>
              </g>
              <g mask="url(#mask1)">
                <g class="pl__ring-rotate">
                  <circle class="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(193,90%,55%)" stroke-width="16" stroke-dasharray="452.39 452.39" stroke-dashoffset="452" stroke-linecap="round" transform="rotate(-45,80,80)"></circle>
                </g>
              </g>

              <g>
                <g stroke-width="4" stroke-dasharray="12 12" stroke-dashoffset="12" stroke-linecap="round" transform="translate(80,80)">
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)"></polyline>
                </g>
              </g>
              <g mask="url(#mask1)">
                <g stroke-width="4" stroke-dasharray="12 12" stroke-dashoffset="12" stroke-linecap="round" transform="translate(80,80)">
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)"></polyline>
                </g>
              </g>

              <g>
                <g transform="translate(64,28)">
                  <g class="pl__arrows" transform="rotate(45,16,52)">
                    <path fill="hsl(3,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"></path>
                    <path fill="hsl(223,10%,90%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"></path>
                  </g>
                </g>
              </g>
              <g mask="url(#mask2)">
                <g transform="translate(64,28)">
                  <g class="pl__arrows" transform="rotate(45,16,52)">
                    <path fill="hsl(333,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"></path>
                    <path fill="hsl(223,90%,80%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"></path>
                  </g>
                </g>
              </g>
            </svg>
          </Col>
          <Col md={3}>
            <label>Actualiza coordenadas:</label>
            <Input
              placeholder="Latitud"
              value={inputLat}
              onChange={(e) => handleInputChange(e, 'lat')}
              style={{margin:'2%'}}
            />
            <Input
              placeholder="Longitud"
              value={inputLng}
              onChange={(e) => handleInputChange(e, 'lng')}
              style={{margin:'2%'}}
            />
            <Button onClick={handleSetCoordinates} style={{margin:'2%'}}>Cambiar Marcador</Button>
          </Col>
        </Row>

        
      </div>
      <div id="map" style={{ height: '536px' }}></div>
      {mapRef.current && mapRef.current.marker && (
        <Button onClick={handleAnimateToMarker} style={{margin:'2%'}}>Centrar en el Marcador</Button>
      )}
      <Button onClick={handleSaveCoordinates} style={{margin:'2%', background:'#7CCD7E', color:'white'}} >Guardar</Button>
    </div>

  );
};

export default MapaActual;
