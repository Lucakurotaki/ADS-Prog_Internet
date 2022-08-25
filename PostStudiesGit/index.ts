import express from 'express';
import { logMiddleware } from './src/middlewares/logMiddleware';
import routes from './src/routes';

const app = express();

app.use(express.json());
app.use(logMiddleware);
app.use(routes);

const appName = 'PostStudies';
const portNumber = 3000;

app.listen(portNumber, ()=>{
    console.log(`${appName} is running on port ${portNumber}`);
})