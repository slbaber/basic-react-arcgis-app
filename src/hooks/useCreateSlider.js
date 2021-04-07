import { useEffect } from "react";
import { loadModules } from "esri-loader";

/**
 *  useCreateSlider
 *
 * This hook will create a color slider with histogram
 */

// TODO: figure out why soft reset will sometimes kill slider entirely and sometimes add another one on top of a pre-existing slider.
//       figure out why react is so picky about html - functionality does not work as expected when html is laid out in a certain way or a className is added

export function useCreateSlider(view, map, selectedTheme, selectedField) {
  // Load modules and slider
  useEffect(() => {
    if (view === null) {
      //do nothing
    } else {
      loadModules(
        [
          "esri/core/watchUtils",
          "esri/layers/FeatureLayer",
          "esri/smartMapping/renderers/color",
          "esri/smartMapping/statistics/histogram",
          "esri/widgets/smartMapping/ColorSlider",
        ],
        {
          css: true,
        }
      ).then(
        ([
          watchUtils,
          FeatureLayer,
          colorRendererCreator,
          histogram,
          ColorSlider,
        ]) => {
          // dummy data from esri.  copy/pasted, nothing to see here.
          const layer = new FeatureLayer({
            url:
              "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0",
            popupTemplate: {
              // autocasts as new PopupTemplate()
              title: "{COUNTY}, {STATE}",
              content:
                "{POP_POVERTY} of {TOTPOP_CY} people live below the poverty line.",
              fieldInfos: [
                {
                  fieldName: "POP_POVERTY",
                  format: {
                    digitSeparator: true,
                    places: 0,
                  },
                },
                {
                  fieldName: "TOTPOP_CY",
                  format: {
                    digitSeparator: true,
                    places: 0,
                  },
                },
              ],
            },
          });

          // create color slider when the view is ready
          watchUtils.whenOnce(view, "ready").then(function generateRenderer() {
            // configure parameters for the color renderer generator
            // the layer must be specified along with a field name
            // or arcade expression. The view and other properties determine
            // the appropriate default color scheme.

            const colorParams = {
              layer: layer,
              valueExpression: selectedField,
              view: view,
              theme: selectedTheme,
              outlineOptimizationEnabled: true,
            };

            // Generate a continuous color renderer based on the
            // statistics of the data in the provided layer
            // and field normalized by the normalizationField.
            //
            // This resolves to an object containing several helpful
            // properties, including color scheme, statistics,
            // the renderer and visual variable

            let rendererResult;

            colorRendererCreator
              .createContinuousRenderer(colorParams)
              .then(function (response) {
                // set the renderer to the layer and add it to the map
                rendererResult = response;
                layer.renderer = rendererResult.renderer;

                if (!map.layers.includes(layer)) {
                  map.add(layer);
                }

                // generate a histogram for use in the slider. Input the layer
                // and field or arcade expression to generate it.

                return histogram({
                  layer: layer,
                  valueExpression: colorParams.valueExpression,
                  view: view,
                  numBins: 70,
                });
              })
              .then(function (histogramResult) {
                // Construct a color slider from the result of both
                // smart mapping renderer and histogram methods
                const colorSlider = ColorSlider.fromRendererResult(
                  rendererResult,
                  histogramResult
                );
                colorSlider.container = document.getElementById("slider");
                colorSlider.primaryHandleEnabled = true;
                // Round labels to 1 decimal place
                colorSlider.labelFormatFunction = function (value, type) {
                  return value.toFixed(1);
                };
                // styles the standard deviation lines to be shorter
                // than the average line
                colorSlider.histogramConfig.dataLineCreatedFunction = function (
                  lineElement,
                  labelElement,
                  index
                ) {
                  if (index != null) {
                    lineElement.setAttribute("x2", "66%");
                    const sign = index === 0 ? "-" : "+";
                    labelElement.innerHTML = sign + "σ";
                  }
                };
                colorSlider.viewModel.precision = 1;

                let divContainer = document.getElementById("slider");
                let resetButton = document.createElement("button");
                resetButton.className = "log-button";
                resetButton.innerHTML = "Reset";
                resetButton.onclick = function reset() {
                  window.location.reload(false);
                };

                divContainer.appendChild(resetButton);

                view.ui.add(divContainer, "bottom-right");

                // when the user slides the handle(s), update the renderer
                // with the updated color visual variable object

                function changeEventHandler() {
                  const renderer = layer.renderer.clone();
                  const colorVariable = renderer.visualVariables[0].clone();
                  const outlineVariable = renderer.visualVariables[1];
                  colorVariable.stops = colorSlider.stops;
                  renderer.visualVariables = [colorVariable, outlineVariable];
                  layer.renderer = renderer;
                }

                colorSlider.on(
                  ["thumb-change", "thumb-drag", "min-change", "max-change"],
                  changeEventHandler
                );
              })
              .catch(function (error) {
                console.log("there was an error: ", error);
              });
          });
        }
      );
    }
  }, [view, map, selectedField, selectedTheme]);
}
