import { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Invoice } from "./models/Invoice";
import { Instance } from "mobx-state-tree";

type InvoiceInstance = Instance<typeof Invoice>;

export const App = observer(({ invoice }: { invoice: InvoiceInstance }) => {
  const nameInput = useRef<HTMLInputElement>(null);
  const quantityInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameInput.current) {
      nameInput.current.focus();
    }
  }, []);
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Invoicer</h1>
        <p className="text-lg">Currency: {invoice.currency}</p>
        <h1 className="text-lg">Status: {invoice.status()}</h1>
        {!invoice.is_paid && (
          <button
            onClick={invoice.markPaid}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Pay
          </button>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              nameInput.current &&
              quantityInput.current &&
              priceInput.current
            ) {
              invoice.ItemList.add({
                name: nameInput.current.value,
                quantity: parseInt(quantityInput.current.value, 10),
                price: parseFloat(priceInput.current.value),
              });
            }
            e.currentTarget.reset();
            if (nameInput.current) {
              nameInput.current.focus();
            }
          }}
        >
          <label htmlFor="name">
            Name
            <input type="text" ref={nameInput} id="name" />
          </label>
          <label htmlFor="quantity">
            Quantity
            <input type="number" ref={quantityInput} id="quantity" />
          </label>
          <label htmlFor="price">
            Price
            <input type="text" ref={priceInput} id="price" />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg p-2"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
});
