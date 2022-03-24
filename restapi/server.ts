import express, { Application, RequestHandler, Request, Response } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import mongoose from "mongoose";

import sellerRouter from "./routers/SellerRouter";
import productRouter from "./routers/ProductRouter";
import orderRouter from "./routers/OrderRouter";
import solidRouter from "./solid/solidRouter";

import { getPriceFromAddress } from "./geocoder/geocoder";

import 'dotenv/config'


const app: Application = express(); 
const options: cors.CorsOptions = {
	origin: ['http://localhost:3000']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});

app.use(metricsMiddleware);
//app.use(cors(options));
app.use(cors());
app.use(bp.json());



app.use("/seller", sellerRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)
app.use("/solid", solidRouter)

app.get("/geocode/:address", async (req: Request, res: Response) => {
	getPriceFromAddress(req.params.address)
		.then((response : any) => {
			res.status(200).send(response);
			console.log(response)
		}).catch((error : any) => {
			res.status(500).json({
				message: error.message,
				error
			})
		})
})

// Connect to the database and start the server.
mongoose.connect('mongodb+srv://cluster0.2sj0r.mongodb.net/', {
		dbName: process.env.DB_NAME,
		user: process.env.DB_USERNAME,
		pass: process.env.DB_PASSWORD,
		retryWrites: true,
		w: 'majority'
	}).then(() => {
		console.log("connected to database: " + process.env.DB_NAME);
	}).catch(err => {
		console.error('Error occured: ' + err.message);
	})
	
app.listen(process.env.PORT, ():void => {
		console.log('Restapi listening on '+ process.env.PORT);
	}).on("error", (error:Error) => {
		console.error('Error occured: ' + error.message);
	});
			
