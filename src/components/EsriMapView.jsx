import React, { useRef } from "react";
import { useInitializeMap } from "../hooks/useIntializeMap";
import Slider from "./Slider.jsx";
// import { useCreateSlider } from "../hooks/useCreateSlider";
// import { loadModules } from "esri-loader";

/**
 * EsriMapView
 *
 * Utilizes the useInitializeMap hook to create the map
 * and return the view, then renders the map view in a div.
 * The button logs the map view's current center latitude
 * and longitude coordinates to show how the map view updates
 * itself independently from react
 */
export default function EsriMapView() {
  // Ref for map
  const mapRef = useRef(null);

  // Map view returned from hook
  const [view, map] = useInitializeMap(mapRef);

  const isCool = () => {
    console.log("James, you are cool!");
  };

  return (
    <div className="map-container">
      <button className="log-button" onClick={isCool}>
        Tell James he is cool
      </button>
      <div id="coords"></div>
      <Slider view={view} map={map} />
      <div className="map-view" ref={mapRef} />
    </div>
  );
}
