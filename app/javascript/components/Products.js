import React from "react";
import { useState,useEffect } from "react";

export default function Products() {
	let [loading, setIsLoading] = useState(true);
	let [products, setProducts] = useState(null);
	let [cantidad, setCantidad] = useState(0);	;

		useEffect(() => {
			setIsLoading(true);
			fetch("/products")
				.then((response) => response.json())
				.then((data) => {
					setProducts(data); 
					setIsLoading(false);
				});
		}, []);

		if (loading) {
			return <div>Loading...</div>;
		}


    return (
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 ">
          	<h1>Buscar</h1>
			{products.map((product) =>  product.name)}
		  <header class="px-5 py-4 border-b border-gray-100">
                <div class="font-semibold text-gray-800">Ventas</div>
            </header>
			<div class = "overflow-x-auto p-3">
				<table class="table-auto w-full">
					<thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
						<tr>
                            <th class="p-2">
                                <div class="font-semibold text-left">Product Name</div>	
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Quantity</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Total</div>
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-center">Action</div>
                            </th>
                    	</tr>
					</thead>	
					<tbody class="text-sm divide-y divide-gray-100">
					{products.map((product) => (
							<tr>
								<td class="p-2">
									{product.name}
								</td>

								<td >
									<label>
										<input 
										type="number"
										min={0}
										/>
									</label>
								</td>

								<td >
									por completar el total
								</td>


								<td class="p-2">
                                <div class="flex justify-center">
                                    <button>
                                        <svg class="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </td>	
							</tr>
					))}
					</tbody>
				</table>
			</div>
			<div class="flex justify-end font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4"> 
				<div>Total</div> 
				<div class="text-blue-600">RM <span x-text="total.toFixed(2)"></span></div>
			</div>
        </div>
    );
    
}
