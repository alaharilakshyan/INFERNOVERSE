// src/components/map/MapView.js
import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ memories }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && memories.length > 0) {
      const bounds = L.latLngBounds(
        memories.map(memory => [memory.location?.lat || 0, memory.location?.lng || 0])
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [memories]);

  return (
    <div style={{ height: '500px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        whenCreated={map => (mapRef.current = map)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {memories.map((memory) => (
          memory.location && (
            <Marker
              key={memory._id}
              position={[memory.location.lat, memory.location.lng]}
            >
              <Popup>
                <div>
                  <h4>{memory.title}</h4>
                  <p>{memory.description}</p>
                  {memory.imageUrl && (
                    <img
                      src={memory.imageUrl}
                      alt={memory.title}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;