"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default markers
const icon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

interface BookingMapProps {
  originCoords: [number, number];
  destinationCoords: [number, number];
  originName: string;
  destinationName: string;
}

export default function BookingMap({
  originCoords,
  destinationCoords,
  originName,
  destinationName,
}: BookingMapProps) {
  useEffect(() => {
    // Force a resize event after the map is loaded to ensure proper rendering
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, []);

  const bounds = L.latLngBounds([originCoords, destinationCoords]);

  return (
    <MapContainer
      bounds={bounds}
      style={{ height: "400px", width: "100%", borderRadius: "0.5rem" }}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={originCoords} icon={icon}>
        <Popup>{originName}</Popup>
      </Marker>
      <Marker position={destinationCoords} icon={icon}>
        <Popup>{destinationName}</Popup>
      </Marker>
    </MapContainer>
  );
}
