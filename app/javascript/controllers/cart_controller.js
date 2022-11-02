import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    products: { type: Array, default: [] },
  };
  static targets = ["show_products"];

  mostrar(event) {

    console.log(event.params);
    let product = {
      ...event.params.payload,
      quantity: 1,
    };
    this.productsValue.push(product);
    this.renderTable();
  }

  renderTable() {
    let html = "";
    let subTotal;
    this.productsValue.forEach((element) => {
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
        ${element.quantity}</td>
        <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
        ${subTotal}</td>
        <td class="py-4 px-6"></td>
      </tr>
      `;
    });
    this.show_productsTarget.innerHTML = html;
  }
}
