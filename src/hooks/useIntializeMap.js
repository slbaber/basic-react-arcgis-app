import { useEffect, useState, useRef } from "react";
import { loadModules } from "esri-loader";

/**
 *  useInitializeMap
 *
 * This hook will load esri, create the map, and return the view
 */
export function useInitializeMap(mapRef) {
  // Local State
  const [mapView, setMapView] = useState(null);
  const [mapMap, setMap] = useState(null);

  const view = useRef();
  const map = useRef();

  // Load modules and create map
  useEffect(() => {
    // Declare the view here to also be used in the clean up

    loadModules(["esri/views/MapView", "esri/Map", "esri/core/watchUtils"], {
      css: true,
    }).then(([MapView, Map, watchUtils]) => {
      // Create the Map
      map.current = new Map({
        basemap: "topo-vector",
      });

      // Assign the new MapView to view
      view.current = new MapView({
        map: map.current,
        container: mapRef.current,
        zoom: 5,
        center: [-85.0502, 33.125524],
      });

      watchUtils.whenTrue(view.current, "stationary", function () {
        // Get the new center of the view only when view is stationary and update the coords div.
        if (view.current.center) {
          let info = `${view.current.center.latitude}, ${view.current.center.longitude}`;

          document.getElementById("coords").innerHTML = `Center:  ${info}`;
        }
      });

      // Save the view and map to state for return
      setMapView(view.current);
      setMap(map.current);
    });

    // Clean up map view
    return () => {
      console.log("cleaning up");
      if (!!view.current) {
        view.current.destroy();
        view.current = null;
      }
    };
  }, [mapRef]);

  // Return the view
  return [mapView, mapMap];
}
