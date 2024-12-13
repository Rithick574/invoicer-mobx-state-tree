import { observer } from "mobx-react";
import {FC} from "react";
import ItemModel from "../models/Item";
import { Instance } from "mobx-state-tree";

interface Props {
    item: Instance<typeof ItemModel>;
  }

const Item:FC<Props> = ({ item }: { item: any }) => {
  return (
    <div>
      <li>
        {item.name} : {item.quantity} * {item.price.toFixed(2)} =  ₹
        {item.total().toFixed(2)}
        <button onClick={item.decrement} className="ml-2 px-2 bg-gray-300 rounded">
          -
        </button>
        <button onClick={item.increment} className="ml-2 px-2 bg-gray-300 rounded">
          +
        </button>
        <button
          onClick={item.remove}
          className="ml-2 px-2 bg-red-500 text-white rounded"
        >
          Remove
        </button>
      </li>
    </div>
  );
};

export default observer(Item);
