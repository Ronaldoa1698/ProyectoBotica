import React from "react";
import { useState,useEffect } from "react";

export default function Products() {
	let [loading, setIsLoading] = useState(true);
	let [products, setProducts] = useState(null);
	let [searchProduct, setsearchProduct] = useState("");	;

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

		const searcher = (e) => {
			setsearchProduct(e.target.value);
			console.log(e.target.value)
		}

		 let results = products;
		 if(!searchProduct){
		 	results = products;
		 }else{
		 	results = products.filter((product) => {
		 		return product.name.toLowerCase().includes(searchProduct.toLowerCase())
	 	})
		}

		// function filterProducts(data, search) {
		// 	console.log(search)
		// 	if(!search){
		// 		return data;
		// 	}
		// 		debugger
		// 	return data.filter((product) => {
		// 		return product.name.toLowerCase().includes(search.toLowerCase())
		// 	})
		// }
		
    return (
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
		  <header class="px-5 py-4 border-b border-gray-100">
                <div class="font-semibold text-gray-800">Ventas</div>
            </header>
			<div class = "overflow-x-auto p-3">
			<input type="text" placeholder="Search" value = {searchProduct} onChange={searcher}/>
				<table class="table-auto w-full table-hover">
					
					<thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
						<tr>
                            <th class="p-2">
                                <div class="font-semibold text-left">Product Name</div>	
                            </th>
                            <th class="p-2">
                                <div class="font-semibold text-left">Quantity</div>
                            </th>
							<th class ="p-2">
								<div class="font-semibold text-left">Price</div>
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
					{results.map((product) => (
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
								<td>
									{product.price}
								</td>

								<td >
									por completar el total
								</td>


								<td class="p-2">
                                <div class="flex justify-center">
                                    <button>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
									 	stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
										<line x1="12" y1="5" x2="12" y2="19"></line>
										<line x1="5" y1="12" x2="19" y2="12"></line>
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
