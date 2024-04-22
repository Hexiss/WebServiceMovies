const express = require('express');
const bodyParser = require('body-parser');
const responseFormatter = require('express-response-formatter');
const routes = require('./route.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 3000;

app.use(bodyParser.json());
// app.use(responseFormatter)

//Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});