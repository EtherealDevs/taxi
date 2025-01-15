'use client'

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface MapModalProps {
    onClose: () => void;
    onSelectLocation: (lat: number, lng: number) => void;
}

const MapModal: React.FC<MapModalProps> = ({ onClose, onSelectLocation }) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    
    useEffect(() => {
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon2x.src,
            iconUrl: markerIcon.src,
            shadowUrl: markerShadow.src,
        });
    }, []);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                onSelectLocation(e.latlng.lat, e.latlng.lng);
            },
        });

        return position === null ? null : (
            <Marker position={position}></Marker>
        );
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-1/2 h-1/2" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end p-2">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: 'calc(60vh - 4rem)', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapModal;
