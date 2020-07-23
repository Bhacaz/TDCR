import React, { useState } from 'react';
import './App.css';
import Map from './components/map/Map.js'
import Menu from './components/menu/Menu.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import layer from './data/TDCR.json'

function App(props) {
    const [selectedLineId, setSelectedLineId] = useState(props.selectedLineId);
    function handleOnTileChange(event) {
        console.log(event)
        setSelectedLineId(event);
    }

    return (
      <div>
        <Menu layer={layer} onLineSelected={handleOnTileChange} />
        <Map selectedLineId={selectedLineId}/>
      </div>
  );
}

export default App;
