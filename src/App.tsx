import React, { useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';

import './global.css';

import CoordinatesProvider from './context/coordinates';

import Header from './components/Header';
import Map from './components/Map';
import Search from './components/Search';

function App() {

  return (
    <div className="App">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_TOKEN}
        libraries={['places']}
      >
        <CoordinatesProvider>
          <Header />
          <Search />
          <Map />
        </CoordinatesProvider>
      </LoadScript>
    </div>
  );
}

export default App;
