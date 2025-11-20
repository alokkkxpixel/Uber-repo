import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const LiveTracking = () => {
   const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );
  }, []);

  if (!position) return <h2>Loading map...</h2>;

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "70vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}></Marker>
    </MapContainer>
  );
}

export default LiveTracking
