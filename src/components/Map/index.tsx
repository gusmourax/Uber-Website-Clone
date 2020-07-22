import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

import { CoordinatesContext } from '../../context/coordinates';

import User from '../../assets/user.svg';
import CentralizeUser from '../../assets/centralize.svg';
import MarkerDirections from '../../assets/direction_marker.svg';

import mapStyle from './mapStyle';
import './style.css';

const Map: React.FC = () => {

    const mapRef = useRef<google.maps.Map>();
    const coords = useContext(CoordinatesContext);
    const [directions, setDirections] = useState<google.maps.DirectionsResult>();
    const [isLocated, setIsLocated] = useState<boolean>(false);
    const [viewport, setViewport] = useState({
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 17,
    });

    useEffect(() => {
        if (coords?.coords) {
            const DirectionsService = new google.maps.DirectionsService();
            DirectionsService.route({
                origin: viewport.center,
                destination: coords.coords,
                travelMode: google.maps.TravelMode.DRIVING
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK)
                    setDirections(result);
            })
        }
    }, [coords?.coords, viewport.center]);

    const onLoadMap = useCallback((loadedMap: google.maps.Map) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setViewport({
                    center: {
                        lat: latitude,
                        lng: longitude
                    },
                    zoom: 17
                });
                setIsLocated(true);
            },
            () => { setIsLocated(false) },
            {
                enableHighAccuracy: true,
                maximumAge: 1000,
                timeout: 2000
            }
        )
        mapRef.current = loadedMap;
    }, []);

    const panToUser = useCallback(() => {
        mapRef.current?.setZoom(17);
        mapRef.current?.panTo(viewport.center);
    }, [viewport]);

    return (
        <GoogleMap
            {...viewport}
            mapContainerClassName="map"
            onLoad={onLoadMap}
            options={{
                disableDefaultUI: true,
                zoomControl: true,
                scrollwheel: false,
                maxZoom: 18,
                styles: mapStyle
            }}
        >
            {isLocated &&
                <>
                    <Marker
                        position={viewport.center}
                        icon={User}
                    />
                    <div className="centralize-box" onClick={panToUser} >
                        <img src={CentralizeUser} alt="" />
                    </div>
                </>
            }
            {directions &&
                <DirectionsRenderer directions={directions} options={{
                    polylineOptions: {
                        clickable: false,
                        strokeColor: '#000',
                        strokeOpacity: 0.7,
                        strokeWeight: 4
                    },
                    markerOptions: {
                        icon: MarkerDirections
                    }
                }} />
            }
        </GoogleMap>
    );
}

export default Map;