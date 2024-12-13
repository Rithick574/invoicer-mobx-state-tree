import { t } from "mobx-state-tree";
import Item from "./Item";

const ItemList = t
  .model("ItemList", {
    items: t.array(Item),
  })
  .actions((self) => ({
    add(item: {
      name: string;
      quantity: number | string;
      price: number | string;
    }) {
      self.items.push({
        ...item,
        quantity: parseInt(item.quantity as string, 10),
        price: parseFloat(item.price as string),
      });
    },
    remove(item: typeof Item.Type) {
      self.items.splice(self.items.indexOf(item), 1);
    },
  }))
  .views((self) => ({
    total() {
        return self.items.reduce((sum,item)=>sum+Item.total(),0)
      },
  }));

export default ItemList;
