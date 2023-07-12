import { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";

function TransactionForm() {
  const { addTransaction } = useGlobalState();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      id: window.crypto.randomUUID(),
      description,
      amount: +amount /* convertir a int */,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter a Description"
          autoFocus
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="number"
          step="0.01"
          placeholder="00.00"
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button className="bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransactionForm;
