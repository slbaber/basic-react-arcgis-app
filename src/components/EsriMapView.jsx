import React, { useRef } from "react";
import { useInitializeMap } from "../hooks/useIntializeMap";

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
  const view = useInitializeMap(mapRef);

  // Logs the view's center coordinants
  const logCenterCoordinants = () => {
    const currentCoords = {
      lat: view.center.latitude,
      long: view.center.longitude,
    };
    console.log(currentCoords);
  };

  return (
    <div className="map-container">
      <button className="log-button" onClick={logCenterCoordinants}>
        Log Current Center Coordinants
      </button>
      <div className="map-view" ref={mapRef} />
    </div>
  );
}
