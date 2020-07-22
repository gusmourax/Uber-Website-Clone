import React, { createContext, useState, useCallback, useEffect } from 'react'

export interface ICoordinates {
    coords: google.maps.LatLngLiteral | undefined,
    setCoords: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | undefined>>
}

export const CoordinatesContext = createContext<ICoordinates | undefined>(undefined);

const CoordinatesProvider: React.FC = ({ children }) => {

    const [coords, setCoords] = useState<google.maps.LatLngLiteral | undefined>({
        lat: 0,
        lng: 0
    });

    return (
        <CoordinatesContext.Provider
            value={{
                coords,
                setCoords
            }}
        >
            {children}
        </CoordinatesContext.Provider>
    );
}

export default CoordinatesProvider;