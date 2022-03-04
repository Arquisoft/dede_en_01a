import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import mongoose from "mongoose";

const sellerRouter = require("./handlers/SellerHandler")
//initial commit backend
const uri: string = "mongodb+srv://admin:admin@cluster0.2sj0r.mongodb.net/DeDe_Database?retryWrites=true&w=majority";

const app: Application = express();
const port: number = 5000;
const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});

app.use(metricsMiddleware);
app.use(cors(options));
app.use(bp.json());
app.use("/seller", sellerRouter)

// Connect to the database and start the server.
mongoose.connect(uri).then(() => {
    app.listen(port, ():void => {
        console.log('Restapi listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
})


