import {Request, Response} from "express";
import Product from "../schemas/ProductSchema"
import { sendError } from "./helper/hellpers";

export let findAllProducts = async (req: Request, res: Response) => {
	await Product.find()
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let findProduct = async (req: Request, res: Response) => {
	await Product.findById(req.params.id)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}


export let addProduct = async (req: Request, res: Response) => {
	await Product.create(req.body)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let deleteProduct = async (req: Request, res: Response) => {
	await Product.create(req.body)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}


export let updateProduct = async (req: Request, res: Response) => {
	await Product.findByIdAndUpdate(req.params.id, req.body)
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))
}

export let findProductBysellerId = async (req: Request, res: Response) => {
	await Product.find({seller_id: req.params.id})
		.then(result => res.status(200).send(result))
		.catch(error => sendError(error, res))	
}