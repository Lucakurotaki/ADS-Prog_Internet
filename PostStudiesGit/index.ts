import express from 'express';
import routes from './src/routes';

const app = express();

app.use(express.json());
app.use(routes);

const appName = 'PostStudies';
const portNumber = 3000;

app.listen(3000, ()=>{
    console.log(`${appName} is running on port ${portNumber}`);
})