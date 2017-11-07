import path from 'path';
import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import configureStore from './src/store/configureStore';
import Application from './src/components/App.jsx';

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', express.static(path.join(__dirname, './')));
app.use('*', express.static(path.join(__dirname, './static')));
app.use('/build/*', express.static(path.join(__dirname, './build/bundle.js')));
app.use('/src/style/*', express.static(path.join(__dirname, './src/style/style.css')));

const renderFullPage = (html) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>The Heights</title>
        <link rel="stylesheet" href="/src/style/style.css">
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Crimson+Text" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      </head>
      <body>
        <div class="root">${html}</div>       
        <script src="/build/bundle.js"></script>   
      </body>
    </html>
    `;
}

const handleRender = (req, res) => {
  const store = configureStore();

  // let foundPath = null;
  // let { path, component } = routeBank.routes.find(
  //   ({ path, exact }) => {
  //     foundPath = matchPath(req.url,
  //       {
  //         path,
  //         exact,
  //         strict: false,
  //       },
  //     );
  //     return foundPath;
  //   }) || {};
  // if (!component) component = {};
  // const context = {};
  const html = renderToString(
    <Provider store={store}>
      {/* <Router context={context} location={req.url}> */}
        <Application />
      {/* </Router> */}
    </Provider>,
  );
  res.send(renderFullPage(html));
}

app.use('/', handleRender);

app.listen(port, () => {
  console.log(`App listening on port${port}`);
});
