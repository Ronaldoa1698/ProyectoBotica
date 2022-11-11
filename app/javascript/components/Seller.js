import React, { useState } from "react";
import Modal from "./Modal";

function Table({ cart, setCart }) {

  const deleteProduct = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  const changeQuantity = (id, newQuantity) => {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: newQuantity };
      } else {
        return product;
      }
    });
    setCart(newCart);
  };

  return (
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Nombre del producto
            </th>
            <th scope="col" class="py-3 px-6">
              Cantidad
            </th>
            <th scope="col" class="py-3 px-6">
              Precio
            </th>
            <th scope="col" class="py-3 px-6">
              Total
            </th>
            <th scope="col" class="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartProduct) => (
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {cartProduct.name}
              </th>
              <td class="py-4 px-6">
                <input
                  type="number"
                  min="0"
                  placeholder="Cantidad"
                  class="border border-gray-300 rounded-lg px-3 py-2"
                  value={cartProduct.quantity}
                  onChange={(e) =>
                    changeQuantity(cartProduct.id, e.target.value)
                  }
                />
              </td>
              <td class="py-4 px-6">{cartProduct.price}</td>
              <td class="py-4 px-6">
                {cartProduct.price * cartProduct.quantity}
              </td>
              <td class="py-4 px-6">
                <button onClick={() => deleteProduct(cartProduct.id)}>
                  <svg
                    class="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Seller() {
  let [cart, setCart] = useState([]);
  return (
    <div>
      <Modal setCart={setCart} />
      <Table cart={cart} setCart={setCart} />
    </div>
  );
}

export default Seller;
