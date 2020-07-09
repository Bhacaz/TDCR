import React from 'react';
import './App.css';
import Map from './components/map/Map.js'
import Menu from './components/menu/Menu.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import layer from './data/TDCR.json'

function App() {
  return (
      <div>
        <Menu layer={layer} />
        <Map />
      </div>
  );
}

export default App;
