import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Products from "./Products";

export default function MyModal({ cart,setCart }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div class="mx-10 mb-3">
        <button
          type="button"
          onClick={openModal}
          class=" rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm 
          font-medium text-white hover:bg-opacity-30 focus:outline-none 
          focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-10"
        >
          Agregar productos
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" class="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25 " />
          </Transition.Child>

          <div class="fixed inset-0 overflow-y-auto ">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Seleccionar producto
                  </Dialog.Title>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      <Products cart={cart} setCart={setCart} />
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
