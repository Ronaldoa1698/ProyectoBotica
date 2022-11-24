import React from "react";

export default function Client() {
  return (
    <>
      <div class="mb-6">
        <label
          for="default-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ingrese nombre del cliente
        </label>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 w-80 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nombre del cliente"
        />
      </div>
    </>
  );
}
