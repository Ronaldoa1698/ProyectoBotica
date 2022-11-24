import React from "react";
import toast from "react-hot-toast";

export default function Sale({ cart, total, setCart }) {
  console.log(cart);

  const saleParams = {
    total: total,
    description: "Venta de productos", // TODO: remove this when delete these field
    products: cart,
  };

  function processSale() {
    if (cart.length === 0) {
      toast.error("No hay productos en el carrito");
      return;
    }
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saleParams),
    };

    fetch("/sales", params)
      .then((response) => response.json())
      .then((data) => {
        toast.success("Venta realizada con éxito");
        setCart([]);
        if (!data) {
          toast.error("Error al realizar la venta");
        }
      });
  }

  return (
    <div>
      <button
        onClick={processSale}
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Pagar
      </button>
    </div>
  );
}
