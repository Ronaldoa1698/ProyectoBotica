import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["show_products"];


  initialize() {
    this.products = []
  }


  add(event) {
    console.log(event.params);
    let product = {
      ...event.params.payload,
      quantity: 1,
    };
    console.log(this.products)
    this.products.push(product);
    this.renderTable();
  }

  updateQuantity(e) {
    console.log(e.target.value);
    console.log(e.params);
    this.products=this.products.map((item) => {
      if(item.id == e.params.id){
        return {
          ...item,
          quantity:e.target.value

        }
      }else{
          return item
      }
    });
    this.renderTable();

  }

  renderTable() {
    let html = "";
    let subTotal;
    this.products.forEach((element) => {
      subTotal = element.price * element.quantity;
      html += `
      <tr class="border-b border-gray-200 dark:border-gray-700">
        <th
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
        >${element.name}</th>
        <td class="py-4 px-6">
        ${element.price}</td>
        <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
        <input data-action = "cart#updateQuantity" data-cart-id-param="${element.id}"
        type="number" min=0 value ="${element.quantity}"/>
        </td>
        <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
        ${subTotal}</td>
        <td class="py-4 px-6"></td>

      </tr>
      `;
    });
    this.show_productsTarget.innerHTML = html;
  }
}
