import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import sellerRouter from '../routers/SellerRouter';

let app:Application;
let server:http.Server;

let sellerId: string;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", sellerRouter)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });

    const response:Response = await request(app)
        .post("/seller/add")
        .send({name: "testSeller"})
        .set('Accept', 'application/json');
    console.error(response.body);
});

afterAll(async () => {
    server.close() //close the server
})

describe('product ', () => {

    it('can be listed',async () => {
        const response:Response = await request(app).get("/product/list");
        expect(response.statusCode).toBe(200);
    });

    it('can be created correctly', async () => {
        let name:string = 'TestHammer';
        let price:number = 20;
        let description:string = 'This is a hammer. There are many like it, but this one is mine.'
        let image:string = 'thisshouldbeanimageid';
        let weight:number = 8;
        const response:Response = await request(app)
            .post('/seller/addProduct/s3ll3r1d')
            .send({name: name, price: price, description: description, image: image, weight: weight})
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
});