import { useState } from "react";
import Map from "./components/Map";

function Shops() {
  const [coordinaates, setCoordinates] = useState({
    lngLat: [59.8378, 24.9574],
    zoom: 8,
  });

  return (
    <div>
      <button
        onClick={() => setCoordinates({ lngLat: [59.8378, 24.9574], zoom: 8 })}
      >
        Kõik poed
      </button>
      <button
        onClick={() => setCoordinates({ lngLat: [59.4378, 24.7574], zoom: 11 })}
      >
        Kõik Tallinna poed
      </button>
      <button
        onClick={() => setCoordinates({ lngLat: [59.4231, 24.7991], zoom: 13 })}
      >
        Ülemiste
      </button>
      <button
        onClick={() => setCoordinates({ lngLat: [59.4277, 24.7193], zoom: 13 })}
      >
        Kristiine
      </button>
      <button
        onClick={() => setCoordinates({ lngLat: [60.1683, 24.9534], zoom: 13 })}
      >
        Helsinki
      </button>
      <Map mapCoordinaates={coordinaates} />
    </div>
  );
}

export default Shops;
