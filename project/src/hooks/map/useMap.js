import {useEffect, useState} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

function useMap(mapRef, city, zoom) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude,
        },
        zoom: zoom,
        zoomControl: false,
        marker: true,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    } else {
      map.setView({lat: city.latitude, lng: city.longitude});
    }
  }, [mapRef, city, map, zoom]);

  return map;
}

export default useMap;
