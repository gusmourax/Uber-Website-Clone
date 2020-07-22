import React, { useState, useCallback, useContext } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { CoordinatesContext } from '../../context/coordinates';

import './style.css';

const Search: React.FC = () => {

    const coords = useContext(CoordinatesContext);
    const [address, setAddress] = useState<string>('');

    const handleSelect = useCallback(async (addressValue: string) => {
        const result = await geocodeByAddress(addressValue);
        const latlng = await getLatLng(result[0]);
        setAddress(addressValue);
        coords?.setCoords(latlng);
    }, [])

    return (
        <PlacesAutocomplete
            value={address}
            onChange={result => setAddress(result)}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className="container">
                    <div className="header">
                        <div>Onde você quer que o motorista te leve?</div>
                    </div>
                    <div className="search-container">
                        <input {...getInputProps({
                            className: 'search-box',
                            placeholder: 'Digite um endereço'
                        })} />
                        {suggestions.map(address => (
                            <div {...getSuggestionItemProps(address, {
                                className: "result-box",
                                key: address.id
                            })}>
                                <span className="result primary" >{address.formattedSuggestion.mainText}</span>
                                <span className="result secondary" >{address.formattedSuggestion.secondaryText}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}

export default Search;