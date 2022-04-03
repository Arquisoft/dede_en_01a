import React from 'react';
import ReactDOM from 'react-dom';
import Router from "react-router-dom";
import { render, screen, cleanup } from '@testing-library/react';
import CartProduct from '../components/listProducts/product/CartProduct';

const handleAddToCart = jest.fn(() => null)

const testProduct = {
  _id: "622fc1418aedec1b7f536775",
  name: "Screwdriver",
  price: 2,
  description: "Multi-purpose screwdriver.",
  image: "b1cb26b99296eb1a8c3a912987c4a8fb5f99efe66e894d484449fe5fb55a9efb",
  weight: 1,
}

test("Product card matches snapshot", () => {
  const fakeProduct = render(<CartProduct product={testProduct} handleAddToCart={handleAddToCart}/>);
  expect(fakeProduct).toMatchSnapshot();
})