import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import initializePassport from "./passport/passport-config";




const app = express();
initializePassport()
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:9000', // Allow requests from Quasar app
}));

const port = 3000;

// routing delle api
app.use('/', require('./routes/routes'));




app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});


