<div align="center">
  <br>
  <h1>Basic React ArcGIS App</h1>
<strong>Utilizing ArcGIS in React</strong> - <a href="https://basic-react-arcgis-app.netlify.app"><strong>Live Demo</strong> </a>
</div>
<br>
<p align="center">
   <a href="https://app.netlify.com/sites/basic-react-arcgis-app/deploys">
    <img src="https://api.netlify.com/api/v1/badges/594a8563-999b-485b-9865-5695caf6bd95/deploy-status" alt="Netlify Status">
  </a>
  <img src="https://img.shields.io/github/last-commit/jameseaster/basic-react-arcgis-app?style=plastic" alt="GitHub last commit">
  <img src="https://img.shields.io/github/languages/code-size/jameseaster/basic-react-arcgis-app?style=plastic" alt="GitHub code size in bytes">
  <img src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg?style=plastic" alt="Code style prettier">
</p>

<br>

Basic React ArcGIS App provides a very simple start to utilizing the [_ArcGIS for JS API_](https://developers.arcgis.com/javascript/latest/) inside of [_Create React App_](https://create-react-app.dev/docs/getting-started/). The generation of the map is held in a custom hook to separate the business logic. This app contains only one extra dependency outside of create-react-app, [_esri-loader_](https://www.npmjs.com/package/esri-loader).

<br>

![app-screenshot](/public/basic-react-arcgis-app_screenshot.jpg)

## Use & Purpose

You can click the "Log Current Center Coordinates" button and then open the dev tools to see that the map view center coordinates are. As you drag the map and click the button again, the coordinates change. This map `view` object updates autonomously from react's state. As a whole, Basic React ArcGIS App is meant to act as an easy gateway into map development with React.

<br>

## Local development

In the project directory:

```bash
yarn install
```

## Scripts

- `yarn start`: starts app, viewable at [http://localhost:3000](http://localhost:3000)
- `yarn build`: Builds the production app
- `yarn eject`: Ejects the app
- `yarn test`: Runs the tests

## Resources

- [React](https://reactjs.org/)
- [Esri Loader](https://www.npmjs.com/package/esri-loader)
- [ArcGIS for JS](https://developers.arcgis.com/javascript/latest/)
