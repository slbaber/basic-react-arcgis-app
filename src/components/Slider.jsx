import React from "react";
import { useCreateSlider } from "../hooks/useCreateSlider";

/**
 * Slider
 *
 * Utilizes the useCreateSlider hook to create an esri color slider
 */

export default function Slider(props) {
  // Logs the view's center coordinates

  const view = props.view;
  const map = props.map;
  const selectedTheme = "above-and-below";
  const selectedField = "( $feature.POP_POVERTY / $feature.TOTPOP_CY ) * 100";

  useCreateSlider(view, map, selectedTheme, selectedField);

  return <div className="slider" id="slider"></div>;
}
