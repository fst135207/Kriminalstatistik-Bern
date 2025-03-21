"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const Map = () => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    fetch('bern_map_data.geojson')
      .then(response => response.json())
      .then(data => setGeoJsonData(data))
      .catch(error => console.error('Fehler beim Laden der GeoJSON-Daten:', error));
  }, []);

  const getColor = (crimeRate: number) => {
    return crimeRate > 100 ? '#800026' :
           crimeRate > 50  ? '#BD0026' :
           crimeRate > 20  ? '#E31A1C' :
           crimeRate > 10  ? '#FC4E2A' :
           crimeRate > 5   ? '#FD8D3C' :
           crimeRate > 0   ? '#FEB24C' :
                             '#FFEDA0';
  };

  const style = (feature: any) => {
    return {
      fillColor: getColor(feature.properties.crimeRate),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });
        layer.bringToFront();
      },
      mouseout: (e: any) => {
        geojson.resetStyle(e.target);
      },
      click: (e: any) => {
        map.fitBounds(e.target.getBounds());
      }
    });
    const popupContent = `<strong>${feature.properties.name}</strong><br />Kriminalitätsrate: ${feature.properties.crimeRate}`;
    layer.bindPopup(popupContent);
  };

  const [map, setMap] = useState<any>(null);
  const [geojson, setGeojson] = useState<any>(null);

  return (
    <MapContainer whenCreated={setMap} center={[46.8, 7.6]} zoom={8} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={style}
          onEachFeature={(feature, layer) => {
            onEachFeature(feature, layer);
            setGeojson(layer);
          }}
        />
      )}
    </MapContainer>
  );
};

export default dynamic(() => Promise.resolve(Map), { ssr: false });
