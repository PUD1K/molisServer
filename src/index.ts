import './loadEnv.js'; //необходимо для корректной работы dotenv, иначе из-за ассинхронного выполнения express - sequelize dotenv не успевает импортироваться

import express from 'express';
import { sequelize } from './db.ts';
import './global_functions/exportModels.ts';
import cors from 'cors';
import router from './controller/index.ts';
import errorHandler from './middleware/ErrorHandlingMiddleware.ts';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import { options } from './swagger.ts';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = process.env.PORT;
const swaggerSpec = swaggerJSDoc(options);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'static')));
app.use(fileUpload({}));
app.use(cookieParser());
app.use('/api/v1', router);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log('Server has been started on PORT', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
