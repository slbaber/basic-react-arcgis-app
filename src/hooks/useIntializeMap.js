import { useEffect, useState } from "react";
import { loadModules } from "esri-loader";

/**
 *  useInitializeMap
 *
 * This hook will load esri, create the map, and return the view
 */
export function useInitializeMap(mapRef) {
  // Local State
  const [mapView, setMapView] = useState(null);

  // Load modules and create map
  useEffect(() => {
    // Declare the view here to also be used in the clean up
    let view;

    loadModules(["esri/views/MapView", "esri/Map"], {
      css: true,
    }).then(([MapView, Map]) => {
      // Create the Map
      const map = new Map({
        basemap: "topo-vector",
      });

      // Assign the new MapView to view
      view = new MapView({
        map: map,
        container: mapRef.current,
        zoom: 14,
        center: [-104.8214, 38.8339],
      });

      // Save the view to state to return it
      setMapView(view);
    });

    // Clean up map view
    return () => {
      if (!!view) {
        view.destroy();
        view = null;
      }
    };
  }, [mapRef]);

  // Return the view
  return mapView;
}
